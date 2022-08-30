<script>
    import Child2 from './Child2.svelte'
    // dispatch 없이 이런식으로 코드를 써도 상위 컴포넌트로 이벤트 전달
</script>

<Child2 on:message/>