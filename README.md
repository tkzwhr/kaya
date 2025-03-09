Kaya
==

Pure Go/Weiqi/Baduk UI library, independent of any specific UI libraries such as React, Vue, etc.


# Features
 
- [x] Board operation
- [x] Load SGF
  - [x] from a raw text
  - [ ] from a file
- [ ] Symbol such as circle, triangle, etc.
- [ ] Multiple path
- [ ] Board size
  - [ ] 9, 13, 19
  - [ ] Square of any size
  - [ ] Rectangle of any size
- [ ] Keyboard operation
- [ ] Mouse wheel operation

# Requirement

* [@sabaki/go-board](https://github.com/SabakiHQ/go-board) (installed automatically)
* [@sabaki/immutable-gametree](https://github.com/SabakiHQ/immutable-gametree) (installed automatically)
* [@sabaki/sgf](https://github.com/SabakiHQ/sgf) (installed automatically)

# Installation

```bash
npm install kaya
```

# Usage

```javascript
<script>
  import Kaya from "kaya";
  
  const el = document.getElementById("board");
  if (el) {
    const kaya = new Kaya(el, 9);
    
    window.kaya = kaya;
  } 
</script>
```

### `#putStone(color, position)`

Put a stone at the specified position on the board.
If null specified, remove the stone from the board.

- `color: string | null`: specify the stone color
  - "black"
  - "white"
  - null
- `position: [number, number]`: specify the position (row and column)

# Note

# Author

* Hiroki Takizawa

# License

*Kaya* is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).
