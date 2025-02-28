function Feature() {
    return (
        <section className="py-16 text-center">
            <h2 className="text-blue-950 text-3xl font-bold">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-10 px-6 md:px-20">
                <div className="p-6 bg-sky-100 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">AI-Powered Summaries</h3>
                    <p className="mt-2 text-gray-600">Get instant, accurate document summaries.</p>
                </div>
                <div className="p-6 bg-sky-100 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">Works on Any Website</h3>
                    <p className="mt-2 text-gray-600">Supports articles, journals, and online documents.</p>
                </div>
                <div className="p-6 bg-sky-100 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">Easy to Use</h3>
                    <p className="mt-2 text-gray-600">One-click summarization with no setup required.</p>
                </div>
            </div>
        </section>
    )
}

export default Feature;