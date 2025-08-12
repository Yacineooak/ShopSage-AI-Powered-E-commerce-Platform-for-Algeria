import { useState } from 'react';
import { Search, ChevronDown, ChevronRight, ShoppingCart, CreditCard, Truck, RotateCcw, User, Shield, MessageSquare, Phone, Mail, ExternalLink, Star, Clock, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';

const helpCategories = [
  {
    id: 'orders',
    title: 'Orders & Tracking',
    icon: ShoppingCart,
    description: 'Help with placing orders, tracking packages, and order management',
    articleCount: 12,
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
  },
  {
    id: 'payments',
    title: 'Payments & Billing',
    icon: CreditCard,
    description: 'Payment methods, billing issues, and transaction help',
    articleCount: 8,
    color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
  },
  {
    id: 'shipping',
    title: 'Shipping & Delivery',
    icon: Truck,
    description: 'Shipping options, delivery times, and logistics information',
    articleCount: 10,
    color: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300'
  },
  {
    id: 'returns',
    title: 'Returns & Exchanges',
    icon: RotateCcw,
    description: 'Return policy, exchange process, and refund information',
    articleCount: 6,
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300'
  },
  {
    id: 'account',
    title: 'Account & Profile',
    icon: User,
    description: 'Account settings, profile management, and login help',
    articleCount: 9,
    color: 'bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300'
  },
  {
    id: 'security',
    title: 'Security & Privacy',
    icon: Shield,
    description: 'Data protection, privacy settings, and security features',
    articleCount: 7,
    color: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
  }
];

const popularFAQs = [
  {
    question: 'How do I track my order?',
    answer: 'You can track your order by logging into your account and visiting the "My Orders" section. You\'ll find a tracking link for each shipped order. Alternatively, you can use the tracking number sent to your email.',
    category: 'orders',
    helpful: 342,
    views: 1205
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers in supported regions. All payments are processed securely.',
    category: 'payments',
    helpful: 298,
    views: 890
  },
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days, Express shipping takes 1-2 business days, and overnight shipping delivers the next business day. International shipping varies by destination.',
    category: 'shipping',
    helpful: 256,
    views: 1100
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for most items. Items must be in original condition with tags attached. Some categories like personalized items are not eligible for return.',
    category: 'returns',
    helpful: 189,
    views: 750
  },
  {
    question: 'How do I reset my password?',
    answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link. The link expires in 24 hours for security.',
    category: 'account',
    helpful: 167,
    views: 520
  },
  {
    question: 'Is my personal information secure?',
    answer: 'Yes, we use industry-standard encryption (SSL) to protect your data. We never store complete credit card information and comply with all privacy regulations.',
    category: 'security',
    helpful: 145,
    views: 430
  }
];

const quickActions = [
  {
    title: 'Contact Support',
    description: 'Get personalized help from our team',
    icon: MessageSquare,
    action: '/contact',
    color: 'bg-primary'
  },
  {
    title: 'Call Us',
    description: 'Speak directly with support',
    icon: Phone,
    action: 'tel:+15551234567',
    color: 'bg-green-600'
  },
  {
    title: 'Email Support',
    description: 'Send us a detailed message',
    icon: Mail,
    action: 'mailto:support@shopsage.com',
    color: 'bg-blue-600'
  }
];

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openFAQs, setOpenFAQs] = useState<Record<number, boolean>>({});

  const filteredFAQs = popularFAQs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (index: number) => {
    setOpenFAQs(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-sage-50 dark:from-primary/5 dark:to-sage-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                How can we{' '}
                <span className="bg-gradient-to-r from-primary to-sage-600 bg-clip-text text-transparent">
                  help you?
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Find answers to your questions, get support, and learn more about ShopSage.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
                <Input
                  type="text"
                  placeholder="Search for help articles, FAQs, guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 h-14 text-lg border-2 focus:border-primary"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Help Articles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Issues Resolved</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {quickActions.map((action, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow group">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${action.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{action.description}</p>
                  <Button asChild>
                    <a href={action.action}>Get Help</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">
        {/* Help Categories */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find help articles organized by topic. Click on a category to filter articles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category) => (
              <Card 
                key={category.id} 
                className={`hover:shadow-lg transition-all cursor-pointer ${
                  selectedCategory === category.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center flex-shrink-0`}>
                      <category.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{category.description}</p>
                      <Badge variant="secondary">
                        {category.articleCount} articles
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Popular FAQs */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {selectedCategory ? 'Filtered' : 'Popular'} Questions
              </h2>
              <p className="text-muted-foreground">
                {filteredFAQs.length} {selectedCategory ? 'filtered' : 'frequently asked'} questions
              </p>
            </div>
            {selectedCategory && (
              <Button
                variant="outline"
                onClick={() => setSelectedCategory(null)}
              >
                Clear Filter
              </Button>
            )}
          </div>

          {filteredFAQs.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search terms or browse by category.
                </p>
                <Button onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}>
                  Reset Search
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <Card key={index}>
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 text-left">
                            <CardTitle className="text-lg">{faq.question}</CardTitle>
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <ThumbsUp className="w-4 h-4 mr-1" />
                                {faq.helpful} helpful
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                                {faq.views} views
                              </div>
                              <Badge variant="outline" className="capitalize">
                                {helpCategories.find(cat => cat.id === faq.category)?.title}
                              </Badge>
                            </div>
                          </div>
                          <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform data-[state=open]:rotate-180" />
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <Separator className="mb-4" />
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {faq.answer}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            Last updated 2 days ago
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">Was this helpful?</span>
                            <Button variant="outline" size="sm">
                              <ThumbsUp className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <ThumbsDown className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Still Need Help */}
        <section className="mt-20">
          <Card className="bg-gradient-to-r from-primary/10 to-sage-100 dark:from-primary/5 dark:to-sage-900 border-0">
            <CardContent className="p-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Can't find what you're looking for? Our support team is here to help you 
                with any questions or issues you might have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Button asChild className="flex-1">
                  <a href="/contact">Contact Support</a>
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <a href="mailto:support@shopsage.com">
                    Email Us
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
