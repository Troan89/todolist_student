import type {Meta, StoryObj} from '@storybook/react';
import React from "react";
import App from './App';
import {Provider} from "react-redux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {store} from "./store";


// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof App> = {
    title: 'TODOLISTS/App',
    component: App,

    parameters: {
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes:
    // https://storybook.js.org/docs/react/api/argtypes
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof App>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args

export const AppWithReduxProviderStory: Story = {
    render: () => <Provider store={store}> <App /> </Provider>
}

export const AppWithReduxStory: Story = {
    render: () => <App demo={false}/>
}

