# WEB103 Prework - *Creatorverse*

Submitted by: **Manoj Ravi Kumar**

About this web app: **Creatorverse is a full-stack app to manage your favorite content creators. You can view, add, edit, and delete creators across platforms like YouTube, Twitch, and TikTok.**

Time spent: **8** hours

## Required Features.    

The following **required** functionality is completed:

- [x] **A logical component structure in React is used to create the frontend of the app**
- [x] **At least five content creators are displayed on the homepage of the app**
- [x] **Each content creator item includes their name, a link to their channel/page, and a short description of their content**
- [x] **API calls use the async/await design pattern via Axios or fetch()**
- [x] **Clicking on a content creator item takes the user to their details page, which includes their name, url, and description**
- [x] **Each content creator has their own unique URL**
- [x] **The user can edit a content creator to change their name, url, or description**
- [x] **The user can delete a content creator**
- [x] **The user can add a new content creator by entering a name, url, or description and then it is displayed on the homepage**

The following **optional** features are implemented:

- [ ] Picocss is used to style HTML elements
- [x] The content creator items are displayed in a creative format, like cards instead of a list
- [x] An image of each content creator is shown on their content creator card

The following **additional** features are implemented:

* [x] Dark-themed custom UI with bold typography and accent colors
* [x] Responsive card grid layout
* [x] Delete confirmation dialog to prevent accidental deletions
* [x] Error handling and loading states throughout the app

## Video Walkthrough

Here's a walkthrough of implemented required features:

👉🏿<img src='https://www.loom.com/share/ec35965703114df0ab0e51b4761d6cfb' title='Video Walkthrough' width='' alt='Video Walkthrough' />


## Notes

Setting up Supabase Row Level Security required disabling RLS on the creators table to allow public read/write access. React Router v6 with useRoutes was used to handle all navigation between pages cleanly.