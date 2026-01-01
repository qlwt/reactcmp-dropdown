# @qyu/reactcmp-dropdown

React Component Library for solving dropdown positioning problems

## Purpose

Library is intended as minimalistic solution for dropdown rendering

It supportas:
- Nested Dropdpowns
- List is rendered in Portal (no issues with overflow)
- Basic focus management (for complex cases you would need external library)
- Basic animations with css transitions (for complex animations you would need external library)

## First include styles

```typescript
// import styles with your bundler or copy them by hand and reference in your html
import "@qyu/reactcmp-dropdown/style/index"
// or import module and insert them directly to the component
import clmap from "@qyu/reactcmp-dropdown/stlye/index"
```

## Basic usage

```tsx
import * as ddn from "qyu/reactcmp-dropdown"

// will render dropdown
function DDN(props: { children: r.Children }) {
    // virtual container will not render any dom element, only create necessary contexts
    // there also a Component that renders a real one
    return <ddn.CmpContainerVirtual>
        <ddn.CmpButton>
            Press
        </ddn.CmpButton>

        <ddn.CmpListPortal
            gap={5}
            // find by id, you can pass HTLMElement directly alternatively
            portal={"ddnportal"}

            // optional
            direction={"ver"}
            // optional
            align={"start"}
            // optional
            justify={"end"}
        >
            {/* Used to measure content. Required for any list */}
            <ddn.Content>
                {props.children}
            </ddn.Content>
        </ddn.CmpListPortal>
    </ddn.CmpContainer>
}

// nested dropdowns
function App() {
    // if you want to render nested dropdown 
    // - it will need its own context with <ddn.CmpContainerVirtual>
    // therefore - this works
    return <DDN>
        <DDN>
            List Content
        </DDN>
    </DDN>
}
```

## Change Transition time and z-index

```css
:root {
    --qyuddn-z-index: 3;
    --qyuddn-trtime: 0.2s;
}
```

## Making your custom button

```tsx
const CustomButton = function () {
    const ref = r.useRef<HTMLButtonElement | null>(null)
    const ctxstate_open = ddn.useCtxStateOpen()

    // this will give you calculated value of wether your dropdown is open or not
    const open = ddn.useOpenInfer({})

    // this wrapper is required, it necessary events and stuff
    return <ddn.ButtonVirtual target={ref}>
        <button 
            ref={ref} 
            onClick={() => ctxstate_open.open_set(o => !o)}
        >
            MyButton
        </button>
    </ddn.ButtonVirtual>
}
```

## Usage with all properties

```tsx
import * as ddn from "qyu/reactcmp-dropdown"

function App() {
    // it is generally recomended to use local state instead of declaring it here
    const [open, open_set] = r.useState(false)

    return <ddn.CmpContainer 
        // optional, will be added to other styles
        className={""}
        // here you can insert styles in modular form
        clmap={clmap}

        // optional, will use local state if not provided
        open={open}
        open_set={open_set}

        // on which events should close the dropdown {CloseEvt_ConfigFull}
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

        // focus controls {Focus_Config}
        // optional, default values below
        focus={{
            // should capture focus
            capture: true,
            // focus options
            capture_options: { preventScroll: true },
            // should restore focus
            restore: true,
            // focus options
            restore_options: { preventScroll: true },
        }}

        // customize rendered element
        render_view={props => <div {...props} />}
    >
        <ddn.CmpButton 
            className={""}
            disabled={false}
            render_view={props => <button {...props} />}

            // if it should be the element list position is based around
            // if unset - applies automatically depending on the context (true for virtual container, false otherwise)
            isroot={false}
        >
            Press
        </ddn.CmpButton>

        {/* ListPortal renders inside a portal with position: fixed */}
        {/* There also ListAbs and ListFix. They share most of the properties. */}
        <ddn.CmpListPortal
            className={""}
            clmap={clmap}
            clmap_content={clmap}
            render_view={props => <div {...props} />}

            // specify the portal
            portal={"domid"}
            portal={document.getElementById("domid")}

            // disable types of transitions, default is false
            transition_nopos={false}
            transition_nosize={false}

            // do not render children when hidden, default is true
            lazy={true}

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
            justify={"end" || "start"}

            // recalculate position on, optional
            // default values shown below
            rearrange={{
                // {any[] | undefined}
                deps: undefined,
                // rearrange when list is opened
                open: true,
                // rearrange on scroll
                scroll: true,
                // rearrange on window resize
                resize: true,
                // rearrange every animation frame
                // if you need to use it - you are probably doing something wrong
                polling: false,
            }}

            // when visibility changes
            event_visibility_chage={(visible: boolean) => {}}
            // when transition status changes
            event_transition_change={(property: string, active: true) => {}}
        >
            {/* Used to measure content. Required for any list */}
            <ddn.Content
                clmap={clmap}
                className={""}
                render_view={props => <div {...props} />}

                // dont render focusguards, false by default
                focus_noguards={false}
            >
                Your Content Here
            </ddn.Content>

            {() => {
                return <ddn.Content>
                    Your Content Here
                </ddn.Content>
            }}
        </ddn.CmpListPortal>
    </ddn.CmpContainer>
}
```
