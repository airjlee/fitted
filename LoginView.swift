//
//  LoginView.swift
//  DubHacks23
//
//  Created by Daniel Le on 10/14/23.
//

//import SwiftUI
//
//import SwiftUI
//
//struct LoginView: View {
//    @State private var username = ""
//    @State private var password = ""
//    @State private var isShowingAlert = false
//
//    var body: some View {
//        NavigationView {
//            VStack {
//                Text("Login")
//                    .font(.largeTitle)
//                    .padding()
//
//                TextField("Username", text: $username)
//                    .textFieldStyle(RoundedBorderTextFieldStyle())
//                    .padding()
//
//                SecureField("Password", text: $password)
//                    .textFieldStyle(RoundedBorderTextFieldStyle())
//                    .padding()
//
//                Button(action: {
//                    // Implement your login logic here
//                    // Call your Python backend to authenticate the user
//                    // Handle the response and show an alert if login fails
//                    self.isShowingAlert = true
//                }) {
//                    Text("Login")
//                        .padding()
//                        .frame(maxWidth: .infinity)
//                        .background(Color.blue)
//                        .foregroundColor(.white)
//                        .cornerRadius(8)
//                }
//                .alert(isPresented: $isShowingAlert) {
//                    Alert(
//                        title: Text("Login Failed"),
//                        message: Text("Incorrect username or password."),
//                        dismissButton: .default(Text("OK"))
//                    )
//                }
//
//                Spacer()
//            }
//            .padding()
//        }
//    }
//}
//
//
//#Preview {
//    LoginView()
//}

import SwiftUI

struct LoginView: View {
    @State private var username = ""
    @State private var password = ""
    @State private var isShowingAlert = false

    // Add a binding to track the login state
    @Binding var isHomeFeedViewPresented: Bool

    var body: some View {
        NavigationView {
            VStack {
                Text("Login")
                    .font(.largeTitle)
                    .padding()

                TextField("Username", text: $username)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .padding()

                SecureField("Password", text: $password)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .padding()

                Button(action: {
                    // Implement your login logic here
                    // Call your Python backend to authenticate the user
                    // Handle the response and show an alert if login fails

                    // Example: Simulate a successful login
                    if username == "your_username" && password == "your_password" {
                        isHomeFeedViewPresented = true
                    } else {
                        self.isShowingAlert = true
                    }
                }) {
                    Text("Login")
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(Color.blue)
                        .foregroundColor(.white)
                        .cornerRadius(8)
                }
                .alert(isPresented: $isShowingAlert) {
                    Alert(
                        title: Text("Login Failed"),
                        message: Text("Incorrect username or password."),
                        dismissButton: .default(Text("OK"))
                    )
                }

                Spacer()
            }
            .padding()
        }
    }
}

