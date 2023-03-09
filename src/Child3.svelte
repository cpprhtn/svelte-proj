<script>
    import { onMount } from 'svelte';
    let photos = [];

    onMount(async () => {
        fetch('https://jsonplaceholder.typicode.com/photos?_limit=20')
        .then(async (res) => {
            photos = await res.json();
        });

        // photos = await res.json();

        return () => {
            console.log('destoryed');
        }
        // console.log(photos);
    });
</script>

{#each photos as photo (photo.id)}
    <figure>
        <img src={photo.thumbnailUrl} alt={photo.title}>
        <figcaption></figcaption>
    </figure>
{:else}
    <p>로딩 중...</p>
{/each}