ReactDOM.render(<Counter />, document.getElementById('root'));

di akhir ada itu

nah ini tuh maksutnya apa?
ini tuh untuk nge render dom nya

nah parameter pertama itu sebenernya React Component
sebenernya ini tuh  syntax nya kayak gini
React.createElement(Counter)

tapi bentukannya bisa jadi kayak gitu

teru sparameter kedua itu dom yang mau di ubah di html nya
biasanya di html nya kayak gini

<body>
  <div id="root"></div>
</body>

jadi bakal ke update disitu


bentukan counternya gini
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}