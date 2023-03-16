<script>
    import { counter } from './stores';
    function increment() {
        counter.update(n => n + 1);
    }
</script>

<button on:click={increment}>+</button>