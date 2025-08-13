import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Phone, Mail, AlertTriangle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { usePaymentStore } from '../../lib/stores/payment-store';
import { useAuthStore } from '../../lib/stores/auth-store';
import { useTranslation, Language } from '../../lib/i18n';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';

interface SecurityVerificationProps {
  transactionId: string;
  amount: number;
  onVerificationComplete: (success: boolean) => void;
  onCancel: () => void;
}

export function SecurityVerification({
  transactionId,
  amount,
  onVerificationComplete,
  onCancel,
}: SecurityVerificationProps) {
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState<'method' | 'sms' | 'email' | 'success' | 'failed'>('method');
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [showResend, setShowResend] = useState(false);
  
  const { verifyTransaction, security } = usePaymentStore();
  const { user } = useAuthStore();
  const language: Language = user?.preferences.language || 'fr';
  const t = useTranslation(language);
  const isRTL = language === 'ar';
  
  // Countdown for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (step === 'sms' || step === 'email') {
      setShowResend(true);
    }
  }, [countdown, step]);
  
  const startSMSVerification = () => {
    setStep('sms');
    setCountdown(60);
    setShowResend(false);
    // Simulate SMS sending
    console.log('SMS verification code sent to:', user?.profile.phone);
  };
  
  const startEmailVerification = () => {
    setStep('email');
    setCountdown(60);
    setShowResend(false);
    // Simulate email sending
    console.log('Email verification code sent to:', user?.email);
  };
  
  const handleVerification = async () => {
    if (verificationCode.length !== 6) return;
    
    setIsLoading(true);
    
    try {
      // Simulate verification delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const isValid = verifyTransaction(transactionId, verificationCode);
      
      if (isValid) {
        setStep('success');
        setTimeout(() => onVerificationComplete(true), 2000);
      } else {
        setAttempts(prev => prev + 1);
        if (attempts >= 2) {
          setStep('failed');
          setTimeout(() => onVerificationComplete(false), 2000);
        } else {
          setVerificationCode('');
          // Show error message
        }
      }
    } catch (error) {
      setStep('failed');
      setTimeout(() => onVerificationComplete(false), 2000);
    } finally {
      setIsLoading(false);
    }
  };
  
  const resendCode = () => {
    if (step === 'sms') {
      startSMSVerification();
    } else if (step === 'email') {
      startEmailVerification();
    }
  };
  
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md mx-4"
      >
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle>
              {language === 'ar' ? 'التحقق الأمني' : language === 'fr' ? 'Vérification de Sécurité' : 'Security Verification'}
            </CardTitle>
            <p className="text-sm text-gray-600">
              {language === 'ar' 
                ? `تحقق من المعاملة بقيمة ${amount} دج`
                : language === 'fr'
                ? `Vérifiez la transaction de ${amount} DA`
                : `Verify transaction of ${amount} DA`
              }
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {step === 'method' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <p className="text-sm text-gray-600 text-center">
                  {language === 'ar' 
                    ? 'اختر طريقة التحقق المفضلة لديك'
                    : language === 'fr'
                    ? 'Choisissez votre méthode de vérification préférée'
                    : 'Choose your preferred verification method'
                  }
                </p>
                
                <div className="space-y-3">
                  {security.smsVerificationEnabled && user?.profile.phone && (
                    <Button
                      variant="outline"
                      className="w-full justify-start h-16"
                      onClick={startSMSVerification}
                    >
                      <Phone className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">
                          {language === 'ar' ? 'رسالة نصية' : language === 'fr' ? 'SMS' : 'SMS'}
                        </div>
                        <div className="text-sm text-gray-600">
                          {user.profile.phone.replace(/(\d{3})\d{3}(\d{3})/, '$1***$2')}
                        </div>
                      </div>
                    </Button>
                  )}
                  
                  {security.emailVerificationEnabled && user?.email && (
                    <Button
                      variant="outline"
                      className="w-full justify-start h-16"
                      onClick={startEmailVerification}
                    >
                      <Mail className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">
                          {language === 'ar' ? 'بريد إلكتروني' : language === 'fr' ? 'Email' : 'Email'}
                        </div>
                        <div className="text-sm text-gray-600">
                          {user.email.replace(/(.{2}).*(@.*)/, '$1***$2')}
                        </div>
                      </div>
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
            
            {(step === 'sms' || step === 'email') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="text-center">
                  <div className="mx-auto mb-3 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    {step === 'sms' ? (
                      <Phone className="h-6 w-6 text-blue-600" />
                    ) : (
                      <Mail className="h-6 w-6 text-blue-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {step === 'sms' ? (
                      language === 'ar' 
                        ? 'تم إرسال رمز التحقق إلى هاتفك'
                        : language === 'fr'
                        ? 'Code de vérification envoyé à votre téléphone'
                        : 'Verification code sent to your phone'
                    ) : (
                      language === 'ar' 
                        ? 'تم إرسال رمز التحقق إلى بريدك الإلكتروني'
                        : language === 'fr'
                        ? 'Code de vérification envoyé à votre email'
                        : 'Verification code sent to your email'
                    )}
                  </p>
                </div>
                
                <div>
                  <Input
                    placeholder="000000"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="text-center text-2xl tracking-widest"
                    maxLength={6}
                  />
                </div>
                
                {attempts > 0 && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      {language === 'ar' 
                        ? `رمز غير صحيح. المحاولات المتبقية: ${3 - attempts}`
                        : language === 'fr'
                        ? `Code incorrect. Tentatives restantes: ${3 - attempts}`
                        : `Invalid code. Attempts remaining: ${3 - attempts}`
                      }
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={handleVerification}
                    disabled={verificationCode.length !== 6 || isLoading}
                    className="w-full"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {language === 'ar' ? 'جاري التحقق...' : language === 'fr' ? 'Vérification...' : 'Verifying...'}
                      </span>
                    ) : (
                      language === 'ar' ? 'تحقق' : language === 'fr' ? 'Vérifier' : 'Verify'
                    )}
                  </Button>
                  
                  {showResend ? (
                    <Button variant="outline" onClick={resendCode} className="w-full">
                      {language === 'ar' ? 'إعادة إرسال الرمز' : language === 'fr' ? 'Renvoyer le code' : 'Resend code'}
                    </Button>
                  ) : countdown > 0 ? (
                    <div className="text-center text-sm text-gray-600">
                      {language === 'ar' 
                        ? `إعادة الإرسال متاحة خلال ${countdown} ثانية`
                        : language === 'fr'
                        ? `Renvoi disponible dans ${countdown} secondes`
                        : `Resend available in ${countdown} seconds`
                      }
                    </div>
                  ) : null}
                </div>
              </motion.div>
            )}
            
            {step === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4"
              >
                <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-green-600">
                    {language === 'ar' ? 'تم التحقق بنجاح!' : language === 'fr' ? 'Vérification réussie!' : 'Verification successful!'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? 'يتم معالجة دفعتك...' : language === 'fr' ? 'Traitement de votre paiement...' : 'Processing your payment...'}
                  </p>
                </div>
              </motion.div>
            )}
            
            {step === 'failed' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4"
              >
                <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-red-600">
                    {language === 'ar' ? 'فشل التحقق' : language === 'fr' ? 'Échec de la v��rification' : 'Verification failed'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? 'تم إلغاء المعاملة لأسباب أمنية' : language === 'fr' ? 'Transaction annulée pour des raisons de sécurité' : 'Transaction cancelled for security reasons'}
                  </p>
                </div>
              </motion.div>
            )}
            
            {step !== 'success' && step !== 'failed' && (
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={onCancel} className="flex-1">
                  {t.common.cancel}
                </Button>
                {step === 'method' && (
                  <Button onClick={() => setStep('sms')} className="flex-1">
                    {t.common.continue}
                  </Button>
                )}
              </div>
            )}
            
            {/* Security info */}
            <div className="border-t pt-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Shield className="h-3 w-3" />
                <span>
                  {language === 'ar' 
                    ? 'محمي بتشفير 256-bit SSL'
                    : language === 'fr'
                    ? 'Protégé par cryptage SSL 256-bit'
                    : 'Protected by 256-bit SSL encryption'
                  }
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// Security status component
export function SecurityStatus() {
  const { security } = usePaymentStore();
  const { user } = useAuthStore();
  const language: Language = user?.preferences.language || 'fr';
  const t = useTranslation(language);
  
  const securityLevel = 
    (security.twoFactorEnabled ? 25 : 0) +
    (security.smsVerificationEnabled ? 25 : 0) +
    (security.emailVerificationEnabled ? 25 : 0) +
    (security.ipWhitelist.length > 0 ? 25 : 0);
  
  const getSecurityColor = (level: number) => {
    if (level >= 75) return 'text-green-600';
    if (level >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const getSecurityLabel = (level: number) => {
    if (level >= 75) return language === 'ar' ? 'عالي' : language === 'fr' ? 'Élevé' : 'High';
    if (level >= 50) return language === 'ar' ? 'متوسط' : language === 'fr' ? 'Moyen' : 'Medium';
    return language === 'ar' ? 'منخفض' : language === 'fr' ? 'Faible' : 'Low';
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          {language === 'ar' ? 'حالة الأمان' : language === 'fr' ? 'État de Sécurité' : 'Security Status'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">
            {language === 'ar' ? 'مستوى الأمان' : language === 'fr' ? 'Niveau de sécurité' : 'Security Level'}
          </span>
          <Badge variant="outline" className={getSecurityColor(securityLevel)}>
            {getSecurityLabel(securityLevel)} ({securityLevel}%)
          </Badge>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              securityLevel >= 75 ? 'bg-green-500' :
              securityLevel >= 50 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${securityLevel}%` }}
          />
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span>
              {language === 'ar' ? 'المصادقة الثنائية' : language === 'fr' ? 'Authentification 2FA' : 'Two-Factor Auth'}
            </span>
            {security.twoFactorEnabled ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-500" />
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <span>
              {language === 'ar' ? 'التحقق بالرسائل النصية' : language === 'fr' ? 'Vérification SMS' : 'SMS Verification'}
            </span>
            {security.smsVerificationEnabled ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-500" />
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <span>
              {language === 'ar' ? 'التحقق بالبريد الإلكتروني' : language === 'fr' ? 'Vérification Email' : 'Email Verification'}
            </span>
            {security.emailVerificationEnabled ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-500" />
            )}
          </div>
        </div>
        
        <div className="border-t pt-4 text-xs text-gray-500">
          <p>
            {language === 'ar' 
              ? `الحد الأقصى للمعاملة اليومية: ${security.maxDailyLimit.toLocaleString()} دج`
              : language === 'fr'
              ? `Limite quotidienne: ${security.maxDailyLimit.toLocaleString()} DA`
              : `Daily limit: ${security.maxDailyLimit.toLocaleString()} DA`
            }
          </p>
          <p>
            {language === 'ar' 
              ? `آخر نشاط: ${new Date(security.lastActivity).toLocaleDateString('ar-DZ')}`
              : language === 'fr'
              ? `Dernière activité: ${new Date(security.lastActivity).toLocaleDateString('fr-DZ')}`
              : `Last activity: ${new Date(security.lastActivity).toLocaleDateString()}`
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
