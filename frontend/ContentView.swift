//
//  ContentView.swift
//  DubHacks23v2
//
//  Created by Daniel Le on 10/15/23.
//

import SwiftUI

struct ContentView: View {
    @State private var isRegistrationViewPresented = false
    @State private var isLoginViewPresented = false
    @State private var isMainFeedViewPresented = false
    @State private var email = ""
    @State private var password = ""
    
    var body: some View {
        VStack {
            
            Text("flair.")
                .font(.system(size: 50))
                .foregroundColor(.white)
                .fontWeight(.heavy)
                .padding(.top, 20)

            
            Spacer()
            
            Text("sign in to your account")
                  .font(Font.custom("Poppins", size: 16))
                  .foregroundColor(.white)
                  .opacity(0.67);
            
            TextField("Email", text: $email)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                
            SecureField("Password", text: $password)
                .textFieldStyle(RoundedBorderTextFieldStyle())
            
            HStack {
                Text("forgot your password?")
                      .font(Font.custom("Poppins", size: 12))
                      .underline()
                      .foregroundColor(.white);
                Spacer()
            }
            
            Button(action: {
                isMainFeedViewPresented.toggle()
            }) {
                Text("log In")
                        .frame(maxWidth: .infinity)
                        .frame(height: 50) // Set the height to your desired value
                        .buttonStyle(BorderlessButtonStyle()) // Remove the default button style
                        .background(Color.clear) // Set the background to transparent
                        .border(Color.white, width: 2) // Add the outline
                        .foregroundColor(.white) // Set the text color
            }
            .fullScreenCover(isPresented: $isMainFeedViewPresented) {
                MainFeed()
            }
            
            Spacer()
            
            Text("or with")
                  .font(Font.custom("Poppins", size: 12).weight(.medium))
                  .foregroundColor(.white);
            
            Button(action: {
                isLoginViewPresented.toggle()
            }) {
                Text("sign in with google")
                    .frame(maxWidth: .infinity)
                    .frame(height: 50) // Set the height to your desired value
                    .buttonStyle(BorderlessButtonStyle()) // Remove the default button style
                    .background(Color.clear) // Set the background to transparent
                    .border(Color.white, width: 2) // Add the outline
                    .foregroundColor(.white) // Set the text color
            }
            
            .sheet(isPresented: $isLoginViewPresented) {
                LoginView()
            }
                        
            Text("don’t have an account?")
                  .font(Font.custom("Poppins", size: 12))
                  .foregroundColor(.white);
            
            Button(action: {
                isLoginViewPresented.toggle()
            }) {
                Text("sign up")
                    .frame(maxWidth: .infinity)
                    .frame(height: 50) // Set the height to your desired value
                    .buttonStyle(BorderlessButtonStyle()) // Remove the default button style
                    .background(Color.clear) // Set the background to transparent
                    .border(Color.white, width: 2) // Add the outline
                    .foregroundColor(.white) // Set the text color
            }
            
            .sheet(isPresented: $isLoginViewPresented) {
                LoginView()
            }
        }
        .padding()
        .background(Color.black)
    }
}

#Preview {
    ContentView()
}
