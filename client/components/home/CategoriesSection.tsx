import { Link } from 'react-router-dom';
import { categories } from '../../lib/data/products';
import { useAppStore } from '../../lib/stores/app-store';
import { useAuthStore } from '../../lib/stores/auth-store';
import { useTranslation, Language } from '../../lib/i18n';
import { Card, CardContent } from '../ui/card';
import { Image } from '../ui/image';

const categoryImages = {
  electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop&auto=format&q=80',
  clothing: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop&auto=format&q=80',
  home: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&auto=format&q=80',
  books: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&auto=format&q=80',
  sports: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format&q=80',
  beauty: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop&auto=format&q=80',
  automotive: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop&auto=format&q=80',
  toys: 'https://images.unsplash.com/photo-1558060370-d140d2fc6d95?w=400&h=300&fit=crop&auto=format&q=80',
};

export function CategoriesSection() {
  const { setSelectedCategory } = useAppStore();
  const { user } = useAuthStore();
  const language: Language = user?.preferences.language || 'fr';
  const t = useTranslation(language);
  const isRTL = language === 'ar';

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <section className={`py-16 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'ar' ? 'تسوق حسب الفئة' : language === 'fr' ? 'Acheter par catégorie' : 'Shop by Category'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'ar'
              ? 'استكشف مجموعتنا الواس��ة من الفئات واعثر على ما تبحث عنه بالضبط'
              : language === 'fr'
              ? 'Explorez notre large gamme de catégories et trouvez exactement ce que vous cherchez'
              : 'Explore our wide range of categories and find exactly what you\'re looking for'
            }
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group"
              onClick={() => handleCategoryClick(category.id)}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={categoryImages[category.id as keyof typeof categoryImages]}
                      alt={language === 'ar' ? t.categories[category.id as keyof typeof t.categories] : category.name}
                      className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white font-semibold text-sm text-center px-2">
                        {language === 'ar' ? t.categories[category.id as keyof typeof t.categories] : category.name}
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
