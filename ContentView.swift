import SwiftUI

struct ContentView: View {
    @State private var isRegistrationViewPresented = false
    @State private var isLoginViewPresented = false
    @State private var isHomeFeedViewPresented = false

    var body: some View {
        NavigationView {
            VStack {
                Text("flair")
                    .font(.largeTitle)
                    .padding()

                Button(action: {
                    isHomeFeedViewPresented.toggle()
                }) {
                    Text("Home Feed")
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(Color.blue)
                        .foregroundColor(.white)
                        .cornerRadius(8)
                }

                Button(action: {
                    isRegistrationViewPresented.toggle()
                }) {
                    Text("Register")
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(Color.green)
                        .foregroundColor(.white)
                        .cornerRadius(8)
                }
                .sheet(isPresented: $isRegistrationViewPresented) {
                    RegistrationView()
                }

                Button(action: {
                    isLoginViewPresented.toggle()
                }) {
                    Text("Login")
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(Color.blue)
                        .foregroundColor(.white)
                        .cornerRadius(8)
                }
                .sheet(isPresented: $isLoginViewPresented) {
                    LoginView(isHomeFeedViewPresented: $isHomeFeedViewPresented)
                }
            }
        }
        .sheet(isPresented: $isHomeFeedViewPresented) {
            let homeFeedViewModel = HomeFeedViewModel()
            HomeFeedView(viewModel: homeFeedViewModel)
        }
        
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}






//import SwiftUI
//
//struct ContentView: View {
//    @State private var isRegistrationViewPresented = false
//    @State private var isLoginViewPresented = false
//    @State private var isHomeFeedViewPresented = false
//
//    @State private var isUserLoggedIn = false // Track login status
//
//    // Initialize the HomeFeedViewModel here
//    let homeFeedViewModel = HomeFeedViewModel()
//
//    var body: some View {
//        NavigationView {
//            VStack {
//                Button(action: {
//                    isRegistrationViewPresented.toggle()
//                }) {
//                    Text("Register")
//                        .padding()
//                        .frame(maxWidth: .infinity)
//                        .background(Color.green)
//                        .foregroundColor(.white)
//                        .cornerRadius(8)
//                }
//                .sheet(isPresented: $isRegistrationViewPresented) {
//                    RegistrationView()
//                }
//                
//                Button(action: {
//                    isLoginViewPresented.toggle()
//                }) {
//                    Text("Login")
//                        .padding()
//                        .frame(maxWidth: .infinity)
//                        .background(Color.blue)
//                        .foregroundColor(.white)
//                        .cornerRadius(8)
//                }
//                .sheet(isPresented: $isLoginViewPresented) {
//                    LoginView(isHomeFeedViewPresented: $isHomeFeedViewPresented)
//                }
//
//                if isUserLoggedIn {
//                    Button(action: {
//                        isHomeFeedViewPresented.toggle()
//                    }) {
//                        Text("Home Feed")
//                            .padding()
//                            .frame(maxWidth: .infinity)
//                            .background(Color.blue)
//                            .foregroundColor(.white)
//                            .cornerRadius(8)
//                    }
//                    .sheet(isPresented: $isHomeFeedViewPresented) {
//                        HomeFeedView(viewModel: homeFeedViewModel)
//                    }
//                }
//            }
//        }
//    }
//}
//
//struct ContentView_Previews: PreviewProvider {
//    static var previews: some View {
//        ContentView()
//    }
//}


