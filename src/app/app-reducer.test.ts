import {appReducer, appSetErrorAC, appSetStatusAC} from "./app-reducer"

let startState: any

beforeEach(() => {
    startState = {
        status: "idle",
        error: null,
        isInitialized:false
    }
})


test('correct error message should be set', () => {
    const endState = appReducer(startState, appSetErrorAC({error: "some error"}))

    expect(endState.error).toBe("some error")
})

test('correct status should be set', () => {
    const endState = appReducer(startState, appSetStatusAC({status: "loading"}))

    expect(endState.status).toBe("loading")
})