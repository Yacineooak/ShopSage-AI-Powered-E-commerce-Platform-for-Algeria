import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Headphones, ShoppingCart, CreditCard, Truck, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Get help via email within 24 hours',
    contact: 'support@shopsage.com',
    action: 'mailto:support@shopsage.com',
    available: '24/7'
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Speak directly with our support team',
    contact: '+1 (555) 123-4567',
    action: 'tel:+15551234567',
    available: 'Mon-Fri 9AM-6PM PST'
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Instant help through our chat system',
    contact: 'Start Chat',
    action: '#',
    available: 'Mon-Fri 9AM-10PM PST'
  },
  {
    icon: Headphones,
    title: 'Video Call',
    description: 'Schedule a video call for complex issues',
    contact: 'Book Appointment',
    action: '#',
    available: 'Mon-Fri 10AM-4PM PST'
  }
];

const departments = [
  {
    icon: ShoppingCart,
    name: 'Order Support',
    description: 'Questions about your orders, tracking, and delivery',
    email: 'orders@shopsage.com',
    topics: ['Order Status', 'Tracking Issues', 'Delivery Problems', 'Order Changes']
  },
  {
    icon: CreditCard,
    name: 'Billing & Payments',
    description: 'Payment issues, refunds, and billing questions',
    email: 'billing@shopsage.com',
    topics: ['Payment Failed', 'Refund Requests', 'Billing Questions', 'Payment Methods']
  },
  {
    icon: RotateCcw,
    name: 'Returns & Exchanges',
    description: 'Help with returns, exchanges, and product issues',
    email: 'returns@shopsage.com',
    topics: ['Return Request', 'Exchange Product', 'Defective Item', 'Wrong Size/Color']
  },
  {
    icon: Headphones,
    name: 'Technical Support',
    description: 'Website issues, account problems, and technical help',
    email: 'tech@shopsage.com',
    topics: ['Login Issues', 'Website Bugs', 'Account Problems', 'App Support']
  }
];

const officeLocations = [
  {
    city: 'San Francisco',
    address: '123 Tech Street, Suite 100\nSan Francisco, CA 94105',
    phone: '+1 (555) 123-4567',
    hours: 'Mon-Fri: 9AM-6PM PST',
    isHQ: true
  },
  {
    city: 'New York',
    address: '456 Commerce Ave, Floor 15\nNew York, NY 10001',
    phone: '+1 (555) 234-5678',
    hours: 'Mon-Fri: 9AM-6PM EST',
    isHQ: false
  },
  {
    city: 'London',
    address: '789 Innovation Road\nLondon, UK SW1A 1AA',
    phone: '+44 20 7123 4567',
    hours: 'Mon-Fri: 9AM-5PM GMT',
    isHQ: false
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    department: '',
    message: '',
    orderNumber: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      department: '',
      message: '',
      orderNumber: ''
    });
    setIsSubmitting(false);
    
    // Show success message (you would typically use a toast here)
    alert('Thank you! Your message has been sent successfully.');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-sage-50 dark:from-primary/5 dark:to-sage-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              <MessageSquare className="w-4 h-4 mr-2" />
              Get in Touch
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              We're Here to{' '}
              <span className="bg-gradient-to-r from-primary to-sage-600 bg-clip-text text-transparent">
                Help
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions, need support, or want to share feedback? Our team is ready to assist you. 
              Choose the best way to reach us below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow group">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <method.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{method.description}</p>
                  <Button asChild className="mb-3">
                    <a href={method.action}>{method.contact}</a>
                  </Button>
                  <div className="text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {method.available}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="orders">Order Support</SelectItem>
                        <SelectItem value="billing">Billing & Payments</SelectItem>
                        <SelectItem value="returns">Returns & Exchanges</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="partnerships">Business Partnerships</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        required
                        placeholder="Brief description of your inquiry"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="orderNumber">Order Number (if applicable)</Label>
                      <Input
                        id="orderNumber"
                        value={formData.orderNumber}
                        onChange={(e) => handleInputChange('orderNumber', e.target.value)}
                        placeholder="e.g., #SG123456"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      placeholder="Please provide details about your inquiry..."
                      rows={6}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Department Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Direct Department Contact</CardTitle>
                <p className="text-muted-foreground text-sm">
                  For faster service, contact the right department directly.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {departments.map((dept, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <dept.icon className="w-4 h-4 text-primary" />
                      <span className="font-medium">{dept.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{dept.description}</p>
                    <div className="text-sm">
                      <a href={`mailto:${dept.email}`} className="text-primary hover:underline">
                        {dept.email}
                      </a>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {dept.topics.slice(0, 2).map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    {index < departments.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Response Times */}
            <Card>
              <CardHeader>
                <CardTitle>Response Times</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Live Chat</span>
                  <Badge variant="secondary">Instant</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Email</span>
                  <Badge variant="secondary">1-24 hours</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Phone</span>
                  <Badge variant="secondary">Immediate</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Contact Form</span>
                  <Badge variant="secondary">1-48 hours</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Office Locations */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Offices</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Visit us at one of our global locations or reach out to your nearest office.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <Card key={index} className={`relative ${office.isHQ ? 'border-primary' : ''}`}>
                {office.isHQ && (
                  <Badge className="absolute -top-2 left-4 bg-primary">
                    Headquarters
                  </Badge>
                )}
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    {office.city}
                  </h3>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {office.address}
                      </p>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                      <a href={`tel:${office.phone}`} className="text-primary hover:underline">
                        {office.phone}
                      </a>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">{office.hours}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Quick Links */}
        <section className="mt-20 text-center">
          <Card className="bg-muted/30 border-dashed">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">Looking for Quick Answers?</h3>
              <p className="text-muted-foreground mb-6">
                Check out our Help Center for instant solutions to common questions.
              </p>
              <Button asChild size="lg">
                <a href="/help">Visit Help Center</a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
