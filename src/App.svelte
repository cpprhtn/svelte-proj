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

	// 조건문
	let x = 0;

	function handleAddX () {
		x += 1;
	}

	// 반복문
	let list = [
		{ id: 1, text: 'test 1' },
		{ id: 2, text: 'test 2' },
		{ id: 3, text: 'test 3' },
	]

	function addItem () {
		const id = Math.max(...list.map(x => x.id)) + 1;
		list = [...list, {id, text: `test ${id}`}];
	}

	function removeItem () {
		list.shift();
		list = list;
	}

	function resetItem () {
		list = [
			{ id: 1, text: 'test 1' },
			{ id: 2, text: 'test 2' },
			{ id: 3, text: 'test 3' }
		];
	}

	// await block
	let promise;

	function sayHello () {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('Hello World')
				//reject(new Error('에러 발생!'));
			}, 1000)
		})
	}

	function handleClick2 () {
		promise = sayHello();
	}

	// DOM event
	let m = {x:0,y:0};
	let isEnter = false;
	function handleMousemove (event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}
	function handleMouseenter () {
		isEnter = true;
	}
	function handleMouseleave () {
		isEnter = false;
	}

	// inline handler
	let ev = {x:0, y:0};

	// 이벤트 수식어
	function handleClick3 () {
		alert('CLICK');
	}
	</script>

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

<hr>

<Child 
	{...info}
/>

<hr>

<button on:click={handleAddX}>Click</button>

{#if x > 10}
	<p>{x}는 10보다 큽니다.</p>
{:else if x > 5}
	<p>{x}는 5보다 큽니다.</p>
{:else}
	<p>{x}는 5보다 작거나 같습니다.</p>
{/if}

<hr>

<button on:click={addItem}>Add</button>
<button on:click={removeItem}>Remove</button>
<button on:click={resetItem}>Reset</button>

<!--ul 1-->
<ul>
	{#each list as item}
	<li>{item.id}, {item.text}</li>
	{/each}
</ul>

<!--ul 2-->
<ul>
	{#each list as {id, text}, i}
	<li>{i}: {id}, {text}</li>
	{/each}
</ul>

<!--ul 3: 반복문에 Key를 지정하는 방식
svelte는 item이 제거되면, 나머지 남은 item을 모두 update하므로 비효율적.
따라서 Key를 지정하여 변경되는 부분을 명시하여 svelte가 좀 더 효율적으로 동작하도록 함.

확인해보니 svelte가 업데이트 되면서 해당 부분은 자동으로 효율적으로 동작하도록 개선완료.
-->
<ul>
	{#each list as {id, text} (id)}
	<li>{id}, {text}</li>
	{/each}
</ul>

<ul>
	{#each list as item (item.id)}
	<li>{item.id}, {item.text}</li>
	{/each}
</ul>

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

	div {
		width: 100%;
		height: 50%;
	}
	div>div {
		width: 300px;
		height: 300px;
		background-color: blue;
		font-size: 80px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<!--await block-->

<hr>

<button on:click={handleClick2}>인사하기</button>

{#await promise}
	<p>인사를 기다리는 중...</p>
{:then data}
	<p>{data}</p>
{:catch error}
	<p>{error.message}</p>
{/await}

<hr>

<!--결과가 오기전까지 출력문구는 사용할 수 없음-->
{#await promise then data}
	<p>{data}</p>
{/await}

<!--DOM event-->
<hr>

<div on:mousemove={handleMousemove}>
	마우스 위치: {m.x}, {m.y}
	<div 
	on:mouseenter={handleMouseenter}
	on:mouseleave={handleMouseleave}>
	{isEnter ? 'Enter':'Leave'}
	</div>
</div>

<!--inline handler-->
<!--svelte는 inline handler를 사용해도 컴파일할떄 최적화가 되기 때문에 사용해도 상관없음-->
<hr>

<div on:mousemove={e => ev = {x: e.clientX, y: e.clientY}}>
	마우스 위치: {ev.x}, {ev.y}
</div>

<!--이벤트 수식어-->

<hr>
<button on:click|once={handleClick3}>Click</button>