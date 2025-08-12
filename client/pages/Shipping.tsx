import { Truck, Clock, MapPin, Package, Shield, Calculator, Plane, Ship, Car } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';

const shippingOptions = [
  {
    name: 'Standard Shipping',
    icon: Truck,
    time: '3-5 business days',
    cost: 'Free on orders $50+, otherwise $5.99',
    description: 'Reliable delivery for most orders',
    features: ['Tracking included', 'Delivery confirmation', 'Carbon neutral']
  },
  {
    name: 'Express Shipping',
    icon: Plane,
    time: '1-2 business days',
    cost: '$9.99',
    description: 'Faster delivery when you need it soon',
    features: ['Priority handling', 'Tracking included', 'Signature required']
  },
  {
    name: 'Overnight Shipping',
    icon: Clock,
    time: 'Next business day',
    cost: '$19.99',
    description: 'Get your order the next business day',
    features: ['Before 6 PM delivery', 'Signature required', 'Insurance included']
  },
  {
    name: 'International Shipping',
    icon: Ship,
    time: '7-14 business days',
    cost: 'Varies by destination',
    description: 'We ship to 50+ countries worldwide',
    features: ['Customs handling', 'Tracking included', 'Duties may apply']
  }
];

const shippingZones = [
  {
    zone: 'Zone 1 - Local',
    regions: ['Same state/province'],
    timeStandard: '1-2 days',
    timeExpress: 'Next day',
    costStandard: '$4.99',
    costExpress: '$7.99'
  },
  {
    zone: 'Zone 2 - Regional',
    regions: ['Neighboring states/provinces'],
    timeStandard: '2-3 days',
    timeExpress: '1-2 days',
    costStandard: '$6.99',
    costExpress: '$9.99'
  },
  {
    zone: 'Zone 3 - National',
    regions: ['Nationwide delivery'],
    timeStandard: '3-5 days',
    timeExpress: '2-3 days',
    costStandard: '$8.99',
    costExpress: '$12.99'
  },
  {
    zone: 'Zone 4 - Remote',
    regions: ['Rural areas, islands'],
    timeStandard: '5-7 days',
    timeExpress: '3-5 days',
    costStandard: '$12.99',
    costExpress: '$19.99'
  }
];

const restrictions = [
  {
    category: 'Hazardous Materials',
    items: ['Flammable liquids', 'Batteries (lithium)', 'Compressed gases', 'Chemicals'],
    note: 'Special handling required, additional fees may apply'
  },
  {
    category: 'Oversized Items',
    items: ['Furniture over 150lbs', 'Items over 8ft length', 'Appliances'],
    note: 'White glove delivery available for additional fee'
  },
  {
    category: 'Restricted Areas',
    items: ['PO Boxes (Express only)', 'Military bases', 'Some remote locations'],
    note: 'Contact customer service for special arrangements'
  },
  {
    category: 'International Restrictions',
    items: ['Electronics in some countries', 'Food products', 'Certain cosmetics'],
    note: 'Check destination country regulations'
  }
];

export default function Shipping() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-sage-50 dark:from-primary/5 dark:to-sage-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              <Truck className="w-4 h-4 mr-2" />
              Shipping Information
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Fast &{' '}
              <span className="bg-gradient-to-r from-primary to-sage-600 bg-clip-text text-transparent">
                Reliable
              </span>{' '}
              Shipping
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We offer multiple shipping options to get your orders to you quickly and safely. 
              Free shipping on orders over $50, with tracking on all deliveries.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 max-w-3xl mx-auto pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99.5%</div>
                <div className="text-sm text-muted-foreground">On-time delivery</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">$50</div>
                <div className="text-sm text-muted-foreground">Free shipping</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Order tracking</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Shipping Options</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the delivery speed that works best for you. All options include tracking and delivery confirmation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shippingOptions.map((option, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <option.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{option.name}</CardTitle>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="text-sm">
                      {option.time}
                    </Badge>
                    <div className="text-lg font-semibold text-primary">
                      {option.cost}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 text-center">
                    {option.description}
                  </p>
                  <div className="space-y-2">
                    {option.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Calculator */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Shipping Calculator</h2>
              <p className="text-muted-foreground">
                Enter your zip code to see exact shipping costs and delivery times for your area.
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <Calculator className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-semibold">Calculate Shipping</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Destination Zip Code</label>
                        <input
                          type="text"
                          placeholder="Enter zip code"
                          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Order Value</label>
                        <input
                          type="number"
                          placeholder="$0.00"
                          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <Button className="w-full">
                        Calculate Shipping
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4">Estimated Costs</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Standard (3-5 days)</span>
                        <span className="font-medium">Free*</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Express (1-2 days)</span>
                        <span className="font-medium">$9.99</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Overnight</span>
                        <span className="font-medium">$19.99</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                      *Free shipping on orders over $50
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Shipping Zones */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Shipping Zones & Rates</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Shipping costs and times vary by destination. Here's a breakdown of our shipping zones.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-card rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-4 font-semibold">Zone</th>
                  <th className="text-left p-4 font-semibold">Regions</th>
                  <th className="text-left p-4 font-semibold">Standard</th>
                  <th className="text-left p-4 font-semibold">Express</th>
                </tr>
              </thead>
              <tbody>
                {shippingZones.map((zone, index) => (
                  <tr key={index} className="border-t border-border">
                    <td className="p-4">
                      <div className="font-medium">{zone.zone}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-muted-foreground">
                        {zone.regions.join(', ')}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <div className="font-medium">{zone.timeStandard}</div>
                        <div className="text-muted-foreground">{zone.costStandard}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <div className="font-medium">{zone.timeExpress}</div>
                        <div className="text-muted-foreground">{zone.costExpress}</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Shipping Restrictions */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Shipping Restrictions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Please note these restrictions and special requirements for certain items and destinations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {restrictions.map((restriction, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-orange-500" />
                    {restriction.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Restricted Items:</h4>
                      <div className="flex flex-wrap gap-1">
                        {restriction.items.map((item, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> {restriction.note}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Order Processing Times */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Order Processing</h2>
              <p className="text-muted-foreground">
                Understanding our fulfillment process and when your order will ship.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Package className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Order Processing</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Orders are processed within 1-2 business days
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Mon-Fri: Same day if ordered before 2 PM
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Truck className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Shipping</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Items ship the next business day after processing
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Tracking number provided once shipped
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Delivery</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Delivered according to selected shipping method
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Signature may be required for valuable items
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-sage-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-4">Questions About Shipping?</h2>
            <p className="text-xl mb-8 opacity-90">
              Our shipping specialists are here to help with any questions about delivery options, 
              costs, or tracking your order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Contact Shipping Support
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Track Your Order
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
