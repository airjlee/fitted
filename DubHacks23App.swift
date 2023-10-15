//
//  DubHacks23App.swift
//  DubHacks23
//
//  Created by Daniel Le on 10/14/23.
//

import SwiftUI
import SwiftData

@main
struct DubHacks23App: App {
    var sharedModelContainer: ModelContainer = {
        let schema = Schema([
            Item.self,
        ])
        let modelConfiguration = ModelConfiguration(schema: schema, isStoredInMemoryOnly: false)

        do {
            return try ModelContainer(for: schema, configurations: [modelConfiguration])
        } catch {
            fatalError("Could not create ModelContainer: \(error)")
        }
        
    }()
    let viewModel = HomeFeedViewModel()
    var body: some Scene {
        WindowGroup {
            ContentView()
            HomeFeedView(viewModel: viewModel)
        }
        .modelContainer(sharedModelContainer)
    }
}
