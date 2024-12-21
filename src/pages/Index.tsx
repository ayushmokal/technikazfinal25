import { Navigation } from "@/components/Navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { BlogSidebar } from "@/components/BlogSidebar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function Index() {
  const { data: blogs } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const featuredArticles = blogs?.slice(0, 2) || [];
  const techDeals = blogs?.filter(blog => blog.category === 'TECH' && blog.subcategory === 'TECH DEALS').slice(0, 4) || [];
  const gadgetArticles = blogs?.filter(blog => blog.category === 'GADGETS').slice(0, 4) || [];
  const recentArticles = blogs?.slice(0, 6) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        {/* Ad Space */}
        <div className="w-full h-20 bg-gray-200 mb-8 flex items-center justify-center">
          <span className="text-gray-500">Ads Here</span>
        </div>

        {/* Featured Stories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {featuredArticles.map((article) => (
            <ArticleCard
              key={article.slug}
              title={article.title}
              image={article.image_url || ''}
              category={article.category}
              slug={article.slug}
            />
          ))}
        </div>

        {/* Tech Deals Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">TECH DEALS</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {techDeals.map((article) => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                image={article.image_url || ''}
                category={article.category}
                slug={article.slug}
              />
            ))}
          </div>
        </section>

        {/* Gadgets Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">GADGETS</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {gadgetArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                image={article.image_url || ''}
                category={article.category}
                slug={article.slug}
              />
            ))}
          </div>
        </section>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Recent Articles */}
          <div className="col-span-2">
            <div className="flex gap-4 mb-6">
              <Button variant="outline" className="rounded-full">Popular</Button>
              <Button variant="outline" className="rounded-full">Recent</Button>
            </div>
            <div className="space-y-6">
              {recentArticles.map((article) => (
                <div key={article.slug} className="flex gap-4">
                  <img
                    src={article.image_url || '/placeholder.svg'}
                    alt={article.title}
                    className="w-32 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-gray-500">{new Date(article.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-6">Load More</Button>
          </div>

          {/* Sidebar */}
          <div className="col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}