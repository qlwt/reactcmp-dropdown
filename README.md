# @qyu/reactcmp-dropdown

React Component Library for solving dropdown positioning problems

## First include styles

```typescript
// import styles with your bundler or copy them by hand and reference in your html
import "@qyu/reactcmp-dropdown/style/index.global"
// or import module and insert them directly to the component
import stylemodule from "@qyu/reactcmp-dropdown/stlye/index.module"
```

## Use Dropdown

```tsx
import * as ddn from "qyu/reactcmp-dropdown"

function App() {
    const [open, open_set] = r.useState(false)

    return <ddn.CmpContainer 
        // optional, will be added to other styles
        className={""}
        // here you can insert styles in modular form
        stylemodule={stylemodule}

        // optional, will use local state if not provided
        open={open}
        open_set={open_set}

        // on which events should close the dropdown
        // optional, all true by default
        closeevents={{ 
            // focus going outside the container
            blur: true,
            // click anywhere outside
            click: true,
            // scroll of any parent
            scroll: true,
            // page resize
            resize: true,
            // press escape
            escape: true,
        }}
    >
        {/* You would often want to imlement you own button. See futher */}
        <ddn.CmpButton className={""}>
            Press
        </ddn.CmpButton>

        <ddn.CmpListAbs
            className={""}
            stylemodule={stylemodule}

            // do not render children when hidden, default if false
            lazy

            // add gap between button and list, in pixels
            gap={5}

            // inverse direction default if "ver"
            direction
            // set direction directly
            direction={"hor" || "ver"}

            // inverse align default is "start"
            align
            // set align directly
            align={"start" || "end" || "center"}

            // inverse justify default is "end"
            justify
            // set justify directly
            jystify={"end" || "start"}
        >
            Your Content Here
        </ddn.CmpListAbs>

        {/* Same as CmpListAbs, but uses fixed positioning */}
        <ddn.CmpListFix
            className={""}
            stylemodule={stylemodule}

            // do not render children when hidden, default if false
            lazy

            // add gap between button and list, in pixels
            gap={5}

            // inverse direction default if "ver"
            direction
            // set direction directly
            direction={"hor" || "ver"}

            // inverse align default is "start"
            align
            // set align directly
            align={"start" || "end" || "center"}

            // inverse justify default is "end"
            justify
            // set justify directly
            jystify={"end" || "start"}
        >
            Your Content Here
        </ddn.CmpListFix>
    </ddn.CmpContainer>
}
```

## Making your custom button

```tsx
export const CmpButton = () => {
    // just listen to the context state
    const ctxstate = r.useContext(CmpCtxState_Open)

    if (!ctxstate) { throw new Error(`Using DropdownStateOpen dependend component outside of DropdownStateOpen Context`) }

    return <button
        onClick={() => {
            ctxstate.open_set(t => !t)
        }}
    >
        Press
    </button>
}
```

## Change Transition time and z-index

```css
:root {
    --qyuddn-z-index: 3;
    --qyuddn-trtime: 0.2s;
}
```
