import { Users, Target, Heart, Award, Globe, Zap, Shield, Sparkles } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';

const teamMembers = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b766?w=300&h=300&fit=crop&crop=face',
    bio: 'Former tech lead at major e-commerce platforms. Passionate about AI and user experience.',
    social: { linkedin: '#', twitter: '#' }
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    bio: 'Machine learning expert with 10+ years in AI development and data science.',
    social: { linkedin: '#', twitter: '#' }
  },
  {
    name: 'Emily Johnson',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    bio: 'Award-winning UX designer focused on creating inclusive and accessible experiences.',
    social: { linkedin: '#', twitter: '#' }
  },
  {
    name: 'David Kim',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    bio: 'Supply chain optimization specialist ensuring fast and reliable delivery worldwide.',
    social: { linkedin: '#', twitter: '#' }
  },
];

const values = [
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Every decision we make starts with asking: "How does this benefit our customers?"'
  },
  {
    icon: Sparkles,
    title: 'Innovation',
    description: 'We leverage cutting-edge AI technology to create shopping experiences that feel magical.'
  },
  {
    icon: Shield,
    title: 'Trust & Security',
    description: 'Your data and transactions are protected with enterprise-grade security measures.'
  },
  {
    icon: Globe,
    title: 'Global Accessibility',
    description: 'Shopping should be accessible to everyone, regardless of language or location.'
  },
];

const milestones = [
  { year: '2020', title: 'Company Founded', description: 'Started with a vision to revolutionize e-commerce through AI' },
  { year: '2021', title: 'AI Engine Launch', description: 'Launched our proprietary recommendation algorithm' },
  { year: '2022', title: 'Global Expansion', description: 'Expanded to 50+ countries with multi-language support' },
  { year: '2023', title: '1M+ Customers', description: 'Reached our first million satisfied customers' },
  { year: '2024', title: 'Carbon Neutral', description: 'Achieved carbon neutrality across all operations' },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-sage-50 dark:from-primary/5 dark:to-sage-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  <Sparkles className="w-4 h-4 mr-2" />
                  About ShopSage
                </Badge>
                
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Revolutionizing{' '}
                  <span className="bg-gradient-to-r from-primary to-sage-600 bg-clip-text text-transparent">
                    E-commerce
                  </span>{' '}
                  with AI
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  We're on a mission to make online shopping smarter, more personalized, 
                  and accessible to everyone. Through the power of artificial intelligence, 
                  we create shopping experiences that understand you better.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-primary">2M+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                  alt="Our team working together"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
              
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-primary/20 to-sage-300/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-sage-300/20 to-primary/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <Card className="p-8 border-l-4 border-l-primary">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <Target className="w-8 h-8 text-primary mr-3" />
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To democratize intelligent shopping by making AI-powered personalization 
                  accessible to everyone, regardless of their technical knowledge or shopping 
                  preferences. We believe that every customer deserves a shopping experience 
                  that understands their unique needs and preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-l-4 border-l-sage-500">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <Zap className="w-8 h-8 text-sage-500 mr-3" />
                  <h2 className="text-2xl font-bold">Our Vision</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  A world where online shopping is not just convenient, but truly intelligent. 
                  Where every product recommendation feels handpicked, every search yields 
                  perfect results, and where shopping becomes a delightful journey of discovery 
                  rather than a chore.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do, from product development to customer service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From a small startup to a global platform, here's how we've grown and evolved.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-sage-400 to-primary"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"></div>
                    <div className="ml-16">
                      <Card className="p-6">
                        <CardContent className="p-0">
                          <div className="flex items-center mb-3">
                            <Badge variant="outline" className="mr-3">
                              {milestone.year}
                            </Badge>
                            <h3 className="text-xl font-semibold">{milestone.title}</h3>
                          </div>
                          <p className="text-muted-foreground">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind ShopSage who work tirelessly to create amazing shopping experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Awards & Recognition</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're honored to be recognized by industry leaders and customers alike.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Best E-commerce Platform', year: '2024', organization: 'Tech Excellence Awards' },
              { title: 'AI Innovation Award', year: '2023', organization: 'Global Tech Summit' },
              { title: 'Customer Choice Award', year: '2023', organization: 'Shopping Awards' },
              { title: 'Sustainability Leader', year: '2024', organization: 'Green Business Council' },
            ].map((award, index) => (
              <Card key={index} className="text-center p-6 border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="p-0">
                  <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{award.title}</h3>
                  <p className="text-muted-foreground text-sm">{award.organization}</p>
                  <Badge variant="outline" className="mt-2">{award.year}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary to-sage-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
            <p className="text-xl mb-8 opacity-90">
              Want to be part of revolutionizing e-commerce? We're always looking for talented 
              individuals who share our passion for innovation and customer excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                View Open Positions
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
