import {appReducer, appSetErrorAC, appSetStatusAC, InitialStateType} from "./app-reducer"

let startState: InitialStateType

beforeEach(() => {
    startState = {
        status: "idle",
        error: null,
        isInitialized:false
    }
})


test('correct error message should be set', () => {
    const endState = appReducer(startState, appSetErrorAC("some error"))

    expect(endState.error).toBe("some error")
})

test('correct status should be set', () => {
    const endState = appReducer(startState, appSetStatusAC("loading"))

    expect(endState.status).toBe("loading")
})