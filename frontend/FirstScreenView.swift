//
//  ContentView.swift
//  DubHacks23
//
//  Created by Daniel Le on 10/14/23.
//

import SwiftUI
import SwiftData

struct ContentView: View {
    @Environment(\.modelContext) private var modelContext
    @Query private var items: [Item]
    
    @State private var isRegistrationViewPresented = false
    @State private var isLoginViewPresented = false

    var body: some View {
        NavigationSplitView {
            VStack {
                Spacer()
                Text("flair")
                    .font(.system(size: 50))
                    .fontWeight(.bold)
            }
            List {
                ForEach(items) { item in
                    NavigationLink {
                        Text("Item at \(item.timestamp, format: Date.FormatStyle(date: .numeric, time: .standard))")
                    } label: {
                        Text(item.timestamp, format: Date.FormatStyle(date: .numeric, time: .standard))
                    }
                }
                .onDelete(perform: deleteItems)
            }
#if os(macOS)
            .navigationSplitViewColumnWidth(min: 180, ideal: 200)
#endif
            .toolbar {
#if os(iOS)
                ToolbarItem(placement: .navigationBarTrailing) {
                    EditButton()
                }
#endif
                ToolbarItem {
                    Button(action: addItem) {
                        Label("Add Item", systemImage: "plus")
                    }
                }
            }
            // Add a button to present the registration view.
            Button(action: { isRegistrationViewPresented.toggle() }) {
                Label("Register", systemImage: "person.fill")
            }
            .sheet(isPresented: $isRegistrationViewPresented) {
                RegistrationView()
            }
            
            // Add a button to present the login view.
            Button(action: { isLoginViewPresented.toggle() }) {
                Label("Login", systemImage: "person.fill")
            }
            .sheet(isPresented: $isLoginViewPresented) {
                LoginView()
            }
            
            // Your other UI elements...
        } detail: {
            Text("Select an item")
        }
        
        
    }

    private func addItem() {
        withAnimation {
            let newItem = Item(timestamp: Date())
            modelContext.insert(newItem)
        }
    }

    private func deleteItems(offsets: IndexSet) {
        withAnimation {
            for index in offsets {
                modelContext.delete(items[index])
            }
        }
    }
}

#Preview {
    ContentView()
        .modelContainer(for: Item.self, inMemory: true)
}
