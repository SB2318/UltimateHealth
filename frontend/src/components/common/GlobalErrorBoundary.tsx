import React, { ErrorInfo, ReactNode } from 'react';
import { View, Text, Button, YStack, Card, Paragraph } from 'tamagui';
import { captureException } from '../../services/monitoring/errorHandler';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class GlobalErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (__DEV__) {
      console.error('[GlobalErrorBoundary] Uncaught error:', error, errorInfo);
    }
    captureException(error, { extra: errorInfo });
  }

  private handleReset = () => {
    // Attempt to recover by resetting state
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <View flex={1} justifyContent="center" alignItems="center" backgroundColor="$background" padding="$5">
          <Card
            elevate
            bordered
            padding="$6"
            borderRadius="$6"
            backgroundColor="$background"
            shadowColor="rgba(0, 0, 0, 0.1)"
            shadowRadius={20}
            shadowOffset={{ width: 0, height: 4 }}
            alignItems="center"
          >
            <YStack space="$4" alignItems="center">
              <Icon name="alert-circle-outline" size={64} color="#ef4444" />
              <Text fontSize={22} fontWeight="700" color="$color12" textAlign="center">
                Something went wrong
              </Text>
              <Paragraph fontSize={15} color="$gray11" textAlign="center">
                We're sorry, but an unexpected error occurred. Our team has been notified.
              </Paragraph>
              <Button
                size="$5"
                backgroundColor="$blue10"
                color="white"
                borderRadius="$4"
                onPress={this.handleReset}
                accessibilityRole="button"
                accessibilityLabel="Try Again"
                marginTop="$4"
                pressStyle={{ backgroundColor: '$blue11', scale: 0.98 }}
              >
                Try Again
              </Button>
            </YStack>
          </Card>
        </View>
      );
    }

    return this.props.children;
  }
}
