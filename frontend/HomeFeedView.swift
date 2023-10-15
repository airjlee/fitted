//
//  HomeFeedView.swift
//  DubHacks23
//
//  Created by Daniel Le on 10/14/23.
//

import SwiftUI

import SwiftUI

// Sample data model for a post
struct Post {
    let id: UUID
    let author: String
    let content: String
    let timestamp: Date
}

// Sample user model
struct User {
    let username: String
    // Add more user properties as needed
}

// Sample ViewModel to manage the home feed
class HomeFeedViewModel: ObservableObject {
    @Published var posts: [Post] = []

    // Function to load posts from the server (replace with your own networking logic)
    func loadPosts() {
        // Simulate loading posts from a server
        DispatchQueue.global().async {
            let newPosts = [
                Post(id: UUID(), author: "User 1", content: "This is a sample post.", timestamp: Date()),
                Post(id: UUID(), author: "User 2", content: "Another post.", timestamp: Date().addingTimeInterval(-3600)),
                // Add more posts...
            ]
            DispatchQueue.main.async {
                self.posts = newPosts
            }
        }
    }

    // Function to add a new post (replace with your own networking logic)
    func addPost(content: String) {
        let newPost = Post(id: UUID(), author: "Current User", content: content, timestamp: Date())
        // Simulate adding a post to a server
        // Update the local posts list with the new post
        self.posts.insert(newPost, at: 0)
    }
}

struct HomeFeedView: View {
    @ObservedObject var viewModel: HomeFeedViewModel
    @State private var newPostContent: String = ""

    var body: some View {
        NavigationView {
            List {
                ForEach(viewModel.posts, id: \.id) { post in
                    PostView(post: post, viewModel: viewModel)
                }

            }
            .onAppear(perform: viewModel.loadPosts)
            .navigationBarTitle("Home Feed")

            // Text input for adding a new post
            HStack {
                TextField("New Post", text: $newPostContent)
                Button(action: addNewPost) {
                    Text("Post")
                }
            }
            .padding()
        }
    }

    func addNewPost() {
        if !newPostContent.isEmpty {
            viewModel.addPost(content: newPostContent)
            newPostContent = ""
        }
    }
}

struct PostView: View {
    let post: Post
    @ObservedObject var viewModel: HomeFeedViewModel

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(post.author)
                .font(.headline)
            Text(post.content)
                .font(.body)
            Text(post.timestamp, style: .relative)
                .font(.caption)
                .foregroundColor(.gray)
        }
        .padding()
    }
}



