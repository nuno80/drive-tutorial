import DriveClone from "../components/ui/drive-clone"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-primary">Google Drive Clone</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <DriveClone />
      </main>
    </div>
  )
}
