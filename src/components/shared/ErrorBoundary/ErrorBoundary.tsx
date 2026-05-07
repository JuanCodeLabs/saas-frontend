import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'

interface ErrorBoundaryProps {
  children: ReactNode
  onReset?: () => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    this.props.onReset?.()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6">
          <Alert variant="error">
            <div className="flex flex-col gap-3">
              <div>
                <h4 className="font-semibold">Something went wrong</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {this.state.error?.message || 'An unexpected error occurred.'}
                </p>
              </div>
              <Button onClick={this.handleReset} size="sm">
                Try again
              </Button>
            </div>
          </Alert>
        </div>
      )
    }

    return this.props.children
  }
}
