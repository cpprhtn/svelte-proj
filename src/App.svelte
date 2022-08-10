<script>
	import Child from './Child.svelte';
	export let name;
	let count = 0;
	let numbers = [1, 2, 3, 4];

	// javascript label
	// 동기적으로 동작 X
	// 따라서 반응형으로 페이지 구성시 $문법 주의 필요
	$: doubled = count * 2;
	$: if (count >= 10) {
		alert("count는 10을 넘을 수 없습니다.");
		count = 0;
	}
	$: sum = numbers.reduce((acc, cur) => acc+cur, 0);

	function handleClick () {
		count+=1;
	}

	function handleMouseDown () {
		console.log("mouse down");
	}

	function addNumber () {
		// svelte는 값의 재할당이 일어나야 반응형으로 동작
		numbers = [...numbers, numbers.length + 1];

		// other example
		/*
		numbers.push(numbers.length + 1);
		numbers = numbers;
		console.log(numbers);
		*/
	}

	// Spread
	let info = {
		myname: 'Cpprhtn',
		job: 'AI Developer',
		website: 'https://cpprhtn.duckdns.org'
	}
	</script>

<Child 
	{...info}
/>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<button on:click={handleClick} on:mousedown={handleMouseDown}>
	Clicked {count}
</button>

<p>{count} 값의 2배는 {doubled}입니다.</p>

<hr>

<p>{numbers.join(" + ")} = {sum}</p>

<button on:click={addNumber}>Add a number</button>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>