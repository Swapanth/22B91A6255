import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Box, 
  Container,
  Alert,
  CircularProgress,
  Fade
} from '@mui/material';
import { Search, BarChart3, AlertCircle } from 'lucide-react';
import { getShortUrlStats } from '../services/api';
import log from '../services/logger';
import UrlStatsTable from '../components/UrlStatsTable';

function StatsPage() {
  const [code, setCode] = useState('');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    if (!code.trim()) {
      setError('Please enter a shortcode');
      return;
    }

    setLoading(true);
    setError('');
    setStats(null);

    try {
      const res = await getShortUrlStats(code);
      setStats(res.data);
      await log('info', 'component', `Fetched stats for: ${code}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch URL statistics');
      await log('error', 'component', `Failed fetching stats for: ${code}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFetch();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
          <BarChart3 size={32} color="#1976d2" />
          <Typography 
            variant="h3" 
            sx={{ 
              ml: 2, 
              fontWeight: 800, 
              color: '#333',
              letterSpacing: '-0.02em'
            }}
          >
            URL Analytics
          </Typography>
        </Box>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          sx={{ 
            maxWidth: 600, 
            mx: 'auto',
            fontWeight: 400,
            lineHeight: 1.6
          }}
        >
          Get detailed insights and analytics for your shortened URLs
        </Typography>
      </Box>

      {/* Search Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 4,
          border: '1px solid #e0e0e0',
          borderRadius: 3,
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Search size={24} color="#1976d2" />
          <Typography 
            variant="h5" 
            sx={{ 
              ml: 1, 
              fontWeight: 600, 
              color: '#333' 
            }}
          >
            Search URL Statistics
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <TextField 
            label="Enter Shortcode" 
            value={code} 
            onChange={(e) => setCode(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., abc123"
            variant="outlined"
            fullWidth
            disabled={loading}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',
                '&:hover': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1976d2'
                  }
                }
              }
            }}
          />
          <Button 
            variant="contained" 
            onClick={handleFetch}
            disabled={loading || !code.trim()}
            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <Search size={18} />}
            sx={{ 
              minWidth: 140,
              height: 56,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '1rem',
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
              '&:hover': {
                boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                transform: 'translateY(-1px)'
              },
              '&:disabled': {
                backgroundColor: '#e0e0e0',
                boxShadow: 'none'
              }
            }}
          >
            {loading ? 'Searching...' : 'Get Stats'}
          </Button>
        </Box>

        {error && (
          <Fade in={true}>
            <Alert 
              severity="error" 
              icon={<AlertCircle size={20} />}
              sx={{ 
                mt: 2,
                borderRadius: 2,
                '& .MuiAlert-message': {
                  fontWeight: 500
                }
              }}
            >
              {error}
            </Alert>
          </Fade>
        )}
      </Paper>

      {/* Results Section */}
      <Fade in={stats !== null} timeout={500}>
        <div>
          <UrlStatsTable stats={stats} />
        </div>
      </Fade>
    </Container>
  );
}

export default StatsPage;