<script>
    import {createEventDispatcher} from 'svelte'
    // dispatch는 항상 최상위 스코프에 선언되어야 함
    // dispatch를 통하여 상위 컴포넌트로 event가 전달
    const dispatch = createEventDispatcher();

    function sayHi () {
        dispatch('message', {
            text: 'Hello!'
        });
    }
</script>

<button on:click={sayHi}>
    Click
</button>