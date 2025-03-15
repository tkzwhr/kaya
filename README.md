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
- [x] Keyboard operation
- [x] Mouse wheel operation

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
    const kaya = new Kaya(el, {
      sgfText: "(;GM[1]FF[4]SZ[9];B[aa];W[ba];B[bb];W[ab];B[];W[])",
    });
    
    window.kaya = kaya;
  } 
</script>
```

### `Constructor(element, options)`

- `element: HTMLElement`: create a go board UI into the element
- `options: KayaOptions`: set up the board

#### KayaOptions

- `sgfText?: string`: specify SGF text
- `enableKeyboard?: boolean`: enable keyboard operation [default: true]
- `enableWheel?: boolean`: enable wheel operation [default: true]

### `#navigate(steps)`

Simulate the state of the game.

- `steps: number`: if positive forward the state of the game to specified number, if negative rewind the state of the game to specified number

# Note

# Author

* Hiroki Takizawa

# License

*Kaya* is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).
