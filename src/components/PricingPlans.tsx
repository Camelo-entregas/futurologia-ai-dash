import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap, Star, Users } from "lucide-react";

export function PricingPlans() {
  const plans = [
    {
      name: "Free",
      price: "R$ 0",
      period: "/mês",
      description: "Para iniciantes que querem testar nossa IA",
      icon: Users,
      features: [
        "3 análises por dia",
        "Probabilidades básicas",
        "Estatísticas limitadas",
        "Suporte por email"
      ],
      limitations: [
        "Sem histórico de confrontos",
        "Sem relatórios PDF",
        "Sem alertas personalizados"
      ],
      buttonText: "Começar Grátis",
      popular: false
    },
    {
      name: "Premium",
      price: "R$ 29,90",
      period: "/mês",
      description: "Ideal para apostadores sérios",
      icon: Zap,
      features: [
        "Análises ilimitadas",
        "IA avançada com 85% precisão",
        "Histórico completo de confrontos",
        "Relatórios em PDF",
        "Alertas em tempo real",
        "Estatísticas detalhadas",
        "Suporte prioritário"
      ],
      limitations: [],
      buttonText: "Assinar Premium",
      popular: true
    },
    {
      name: "Pro",
      price: "R$ 99,90",
      period: "/mês",
      description: "Para profissionais e tipsters",
      icon: Crown,
      features: [
        "Tudo do Premium +",
        "API para integração",
        "Relatórios personalizados",
        "Análise de múltiplas ligas",
        "Consultoria 1-on-1",
        "Acesso antecipado a features",
        "Suporte 24/7 por WhatsApp",
        "Dashboard white-label"
      ],
      limitations: [],
      buttonText: "Assinar Pro",
      popular: false
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Escolha Seu Plano</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Aumente sua taxa de acerto com nossa IA especializada em análise de futebol. 
          Teste grátis por 7 dias!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => {
          const IconComponent = plan.icon;
          return (
            <Card 
              key={index} 
              className={`relative bg-card/80 backdrop-blur-sm border-border transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'border-primary shadow-lg shadow-primary/20' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  <Star className="h-3 w-3 mr-1" />
                  Mais Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full ${plan.popular ? 'bg-primary/20' : 'bg-secondary/50'}`}>
                    <IconComponent className={`h-8 w-8 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                </div>
                
                <CardTitle className="text-2xl font-bold text-foreground">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
                
                <div className="pt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations.map((limitation, limitIndex) => (
                    <div key={limitIndex} className="flex items-center space-x-3 opacity-50">
                      <div className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground line-through">{limitation}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                      : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                  }`}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>

                {index === 0 && (
                  <p className="text-xs text-center text-muted-foreground">
                    Sem cartão de crédito necessário
                  </p>
                )}
                
                {index === 1 && (
                  <p className="text-xs text-center text-muted-foreground">
                    7 dias grátis • Cancele a qualquer momento
                  </p>
                )}

                {index === 2 && (
                  <p className="text-xs text-center text-muted-foreground">
                    Inclui onboarding personalizado
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* FAQ Section */}
      <Card className="bg-card/80 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="text-center">Perguntas Frequentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Como funciona o teste grátis?</h4>
              <p className="text-sm text-muted-foreground">
                Você tem 7 dias para testar todas as funcionalidades do plano Premium sem pagar nada. 
                Cancele antes do vencimento se não estiver satisfeito.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">Qual a taxa de acerto da IA?</h4>
              <p className="text-sm text-muted-foreground">
                Nossa IA possui 85.2% de precisão nas análises, baseada em mais de 50.000 jogos 
                analisados e algoritmos de machine learning avançados.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">Posso cancelar a qualquer momento?</h4>
              <p className="text-sm text-muted-foreground">
                Sim! Não há fidelidade. Você pode cancelar sua assinatura a qualquer momento 
                diretamente na plataforma ou entrando em contato conosco.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">Quais formas de pagamento aceitas?</h4>
              <p className="text-sm text-muted-foreground">
                Aceitamos cartão de crédito, débito, PIX e PayPal. Todos os pagamentos são 
                processados com segurança através do Stripe.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Money Back Guarantee */}
      <div className="text-center bg-primary/10 rounded-lg p-6 border border-primary/20">
        <h3 className="text-xl font-bold text-foreground mb-2">Garantia de 30 dias</h3>
        <p className="text-muted-foreground">
          Se você não aumentar sua taxa de acerto em 30 dias, devolvemos 100% do seu dinheiro.
        </p>
      </div>
    </div>
  );
}