import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Documentation | My Public API",
  description: "Public Filipino recipes and phones API documentation",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-gray-950 p-4 text-sm text-green-300">
      <code>{children}</code>
    </pre>
  );
}

export default function DocsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <header className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
          My Public API
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          API Documentation
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Access Filipino recipes through a simple REST API.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Base URL</h2>

        <CodeBlock>
          {"https://your-domain.vercel.app/api/v1"}
        </CodeBlock>

        <p className="mt-3 text-gray-600">
          During local development:
        </p>

        <CodeBlock>
          {"http://localhost:3000/api/v1"}
        </CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Authentication</h2>

        <p className="text-gray-600">
          Authentication is not required in the initial public version of this
          API.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">
          List recipes
        </h2>

        <CodeBlock>
          {"GET /recipes"}
        </CodeBlock>

        <p className="mt-3 text-gray-600">
          Returns published recipes with pagination.
        </p>

        <h3 className="mt-6 mb-2 text-lg font-semibold">
          Query parameters
        </h3>

        <ul className="list-disc space-y-1 pl-6 text-gray-600">
          <li>
            <code>page</code> — Page number. Defaults to <code>1</code>.
          </li>
          <li>
            <code>limit</code> — Number of results. Maximum is <code>100</code>.
          </li>
          <li>
            <code>search</code> — Search by recipe title.
          </li>
          <li>
            <code>category</code> — Filter by category slug.
          </li>
        </ul>

        <h3 className="mt-6 mb-2 text-lg font-semibold">
          Example request
        </h3>

        <CodeBlock>
          {
            "GET /recipes?category=soups&search=chicken&page=1&limit=20"
          }
        </CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">
          Get a recipe by slug
        </h2>

        <CodeBlock>
          {"GET /recipes/{slug}"}
        </CodeBlock>

        <h3 className="mt-6 mb-2 text-lg font-semibold">
          Example request
        </h3>

        <CodeBlock>
          {"GET /recipes/chicken-adobo"}
        </CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">
          List categories
        </h2>

        <CodeBlock>
          {"GET /categories"}
        </CodeBlock>

        <p className="mt-3 text-gray-600">
          Returns the available recipe categories.
        </p>
      </section>

      <section className="mb-10">
    <h2 className="mb-3 text-2xl font-semibold">
      List phones
    </h2>

    <CodeBlock>
      {"GET /phones"}
    </CodeBlock>

    <p className="mt-3 text-gray-600">
      Returns published phones with pagination and search support.
    </p>

    <h3 className="mt-6 mb-2 text-lg font-semibold">
      Query parameters
    </h3>

    <ul className="list-disc space-y-1 pl-6 text-gray-600">
      <li>
        <code>page</code> — Page number. Defaults to <code>1</code>.
      </li>
      <li>
        <code>limit</code> — Number of results. Maximum is <code>100</code>.
      </li>
      <li>
        <code>search</code> — Search by phone name.
      </li>
    </ul>

    <h3 className="mt-6 mb-2 text-lg font-semibold">
      Example request
    </h3>

    <CodeBlock>
      {"GET /phones?search=redmi&page=1&limit=20"}
    </CodeBlock>
  </section>

  <section className="mb-10">
    <h2 className="mb-3 text-2xl font-semibold">
      Get a phone by slug
    </h2>

    <CodeBlock>
      {"GET /phones/{slug}"}
    </CodeBlock>

    <p className="mt-3 text-gray-600">
      Returns detailed phone information, specifications, and variants.
    </p>

    <h3 className="mt-6 mb-2 text-lg font-semibold">
      Example request
    </h3>

    <CodeBlock>
      {"GET /phones/iphone-17"}
    </CodeBlock>
  </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">
          Example success response
        </h2>

        <CodeBlock>
          {`{
  "data": [
    {
      "id": 1,
      "slug": "chicken-adobo",
      "title": "Classic Filipino Chicken Adobo",
      "description": "Tender chicken simmered in soy sauce and vinegar.",
      "imageUrl": "http://localhost:3000/images/recipes/chicken-adobo.jpg"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "nextPage": null
  }
}`}
        </CodeBlock>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold">
          Error response
        </h2>

        <CodeBlock>
          {`{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid recipe query parameters",
    "details": []
  }
}`}
        </CodeBlock>
      </section>
    </main>
  );
}