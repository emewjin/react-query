## api를 어디서 관리할 것인가?
- 일단 원래 하던대로 api 함수를 별도 분리, 공통 부분은 공통 함수로 추출
- 각 api 함수를 react query에서 가져다 쓰게 함

## error 핸들링을 어떻게 할 것인가?
컨셉 : 에러 처리를 일관적으로 하기 위해서 관련 코드들을 분산시키지 않는다. 훅을 이용해 모아둔다.  

리액트 쿼리를 이용한 에러 핸들링에는 크게 세 가지 방법이 있다.

[리액트 쿼리 개발자가 작성한 리액트 쿼리로 에러 핸들링 하는 방법](https://tkdodo.eu/blog/react-query-error-handling)
> 1. useQuery에서 리턴하는 error, isError 등을 이용하기
> 2. useQuery에서 설정할 수 있는 onError 콜백을 활용하거나, 글로벌 QueryCache / MutationCache에서 설정할 수 있는 onError 콜백을 활용하기
> 3. Error Boundaries를 활용하기

1번의 방법으로 하면 다음과 같은 코드를 작성하여 에러 발생시 미리 준비해둔 ui를 보여줄 수 있는데, 모든 컴포넌트마다 (정확히는 페이지 단위) 아래 코드를 넣어주기 귀찮기도 하고 추후 유지보수하기도 불리하다.
```ts
if (isError) return <div>error</div>;
```
대신 에러 바운더리를 이용하면 한 곳에서 관리할 수 있다. 방법은 다음과 같다.
```ts
// 모든 에러를 가장 가까운 에러 바운더리로 쏨
useQuery(['todos'], fetchTodos, { useErrorBoundary: true })

// 에러 바운더리를 거치게 할 범위를 커스터마이징 할 수 있음
useQuery(['todos'], fetchTodos, {
  useErrorBoundary: (error) => error.response?.status >= 500,
})
```

onError 콜백을 함께 이용할 수도 있다.  
다만 각각의 useQuery에서 onError 콜백을 이용하는 것과 쿼리 클라이언트에서 관리하는 것은 조금 다르다.

만약 useQuery에서 onError를 관리하게 된다면, 어떤 옵저버 (리액트 쿼리에서 하나의 캐시 entry를 감시하는 객체)든간에 호출될 수 있다. 즉, 콜은 한 번 실패했더라도 쿼리를 두 번 호출한다면 콘솔도 두 번 찍히는 문제가 발생한다고 한다. 그 이유는 렌더링 될 때마다 useQuery 호출, 호출시 새로운 옵저버 생성, 옵저버가 OnError 호출하기 때문이라고 함. (onError 콜백은 네트워크 요청 한 번당 찍히며 옵저버별로 찍히지 않는다는 의견이 있기도 함)

```ts
useQuery(['todos'], fetchTodos, {
    onError: (error, query) =>
      console.error(error)
})
```

어쨌거나 그런 이유로 저 글을 쓴 리액트 쿼리 개발자는 글로벌 콜백을 이용하는 것을 추천한다고 함. 글로벌 콜백에선 defaultOption을 이용할 수도 있는데 ([화해팀의 방식](http://blog.hwahae.co.kr/all/tech/tech-tech/7867/)), 이것보다는 queryCache를 이용하는 것이 예상을 좀 더 쉽게 한다고 함.

- defaultOption
```ts
  const reactQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        onError: (error) => {
          ...
        },
      },
    },
  })
```

- queryCache
```ts
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) =>
      console.error(error)
  }),
})
```

글로벌 콜백에서 좀 더 세부적으로 에러를 알리고 싶다면 meta 객체를 이용하면 된다고 한다. useQuery, useMutation 모두 지원한다.

```ts
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      toast.error(`${query.meta.myMessage}: ${error}`)
    },
  }),
})

// meta 데이터를 설정한다
useQuery(key, fn, { meta: { myMessage: "..." })
```

>QueryCache  
react query의 저장소 메커니즘. react query의 모든 데이터를 저장한다. 일반적으로 개발자가 직접 QueryCache에 접근할 일은 거의 없고 특정 cache에 접근하기 위해서는 QueryClient를 사용한다.

이후 만약 특정 예외적인 에러 핸들링이 필요하다면 useQuery에서 덮어쓰면 된다.

> React Query의 onError의 값으로는 기본적으로 QueryClient를 생성할 때 설정한 핸들러가 사용되지만 useQuery나 useMutation Hook을 사용할 때 option으로 onError에 새로운 핸들러를 설정하면 기본값을 덮어씁니다.
