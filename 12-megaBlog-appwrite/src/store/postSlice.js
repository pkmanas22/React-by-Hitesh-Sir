// Create for userPosts and all posts

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userPosts: [],
    allPosts: []
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setAllPosts: (state, action) => {
            state.allPosts = action.payload         // action = (allPosts)
        },
        setUserPosts: (state, action) => {
            state.userPosts = action.payload        // action = (userPosts)
        },
        addPost: (state, action) => {
            const newPost = action.payload        // action = (newPost)
            state.allPosts.unshift(newPost)
            state.userPosts.unshift(newPost)
        },
        deletePost: (state, action) => {
            const postId = action.payload;        // action = (postId)
            state.allPosts = state.allPosts.filter((post) => post.$id !== postId);
            state.userPosts = state.userPosts.filter((post) => post.$id !== postId)
        },
        updatePost: (state, action) => {
            const updatedPost = action.payload;        // action = (updatedPost)

            const indexAtAllPosts = state.allPosts.findIndex((post) => post.$id === updatedPost.$id);
            if (indexAtAllPosts !== -1) {
                state.allPosts[indexAtAllPosts] = updatedPost;
            }

            const indexAtUserPosts = state.userPosts.findIndex((post) => post.$id === updatedPost.$id);
            if (indexAtUserPosts !== -1) {
                state.userPosts[indexAtUserPosts] = updatedPost;
            }
        }
    }
})

export const { setAllPosts, setUserPosts, deletePost, updatePost, addPost } = postSlice.actions

export default postSlice.reducer;