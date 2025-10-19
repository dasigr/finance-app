import { Metadata } from "next";
import { lusitana } from '@/app/ui/fonts';
import { fetchArticles } from '@/app/lib/data';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Articles',
};

export default async function ArticlesPage() {
  const articles = await fetchArticles();

  return (
    <div className="w-full pb-12">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Articles</h1>
      </div>
      <div className="mt-5">
        <ul>
          {articles.map((article) => (
            <li key={article.id}>{article.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
