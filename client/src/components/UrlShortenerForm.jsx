import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  Typography, 
  Paper, 
  Box, 
  Fade, 
  IconButton,
  Chip,
  Container,
  Stack,
  Card,
  CardContent,
  LinearProgress,
  Tooltip,
  Alert
} from '@mui/material';
import { 
  Plus, 
  Link2, 
  Copy,
  Trash2,
  ExternalLink,
  Clock,
  Check,
  Zap,
  Globe
} from 'lucide-react';

// Mock API function
const createShortUrl = async (input) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    data: {
      shortLink: `https://short.ly/${Math.random().toString(36).substr(2, 6)}`,
      expiry: new Date(Date.now() + (input.validity || 60) * 60000).toLocaleString(),
      originalUrl: input.url
    }
  };
};

function UrlShortenerForm() {
  const [inputs, setInputs] = useState([{ url: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const handleAddInput = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { url: '', validity: '', shortcode: '' }]);
    }
  };

  const handleRemoveInput = (index) => {
    if (inputs.length > 1) {
      const newInputs = inputs.filter((_, i) => i !== index);
      setInputs(newInputs);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const newResults = [];
    
    for (let input of inputs) {
      if (!input.url) continue;
      try {
        const res = await createShortUrl(input);
        newResults.push(res.data);
      } catch (err) {
        console.error('Failed shortening:', input.url);
      }
    }
    
    setResults(prev => [...prev, ...newResults]);
    setLoading(false);
  };

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy');
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
          <Zap size={32} color="#1976d2" />
          <Typography 
            variant="h3" 
            sx={{ 
              ml: 2, 
              fontWeight: 800, 
              color: '#333',
              letterSpacing: '-0.02em'
            }}
          >
            URL Shortener
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
          Transform your long URLs into elegant, shareable short links
        </Typography>
      </Box>

      {/* Main Form Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 4,
          border: '1px solid #e0e0e0',
          borderRadius: 3,
          backgroundColor: '#fff'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Link2 size={24} color="#1976d2" />
          <Typography 
            variant="h5" 
            sx={{ 
              ml: 1, 
              fontWeight: 600, 
              color: '#333' 
            }}
          >
            Create Short Links
          </Typography>
        </Box>

        {/* Input Forms */}
        <Stack spacing={3}>
          {inputs.map((input, i) => (
            <Fade key={i} in={true} timeout={300 + i * 100}>
              <Card
                elevation={0}
                sx={{
                  border: '1px solid #e9ecef',
                  borderRadius: 2,
                  backgroundColor: '#fafafa',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: '#1976d2',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={5}>
                      <TextField
                        fullWidth
                        label="Enter URL"
                        placeholder="https://example.com/very-long-url"
                        value={input.url}
                        onChange={(e) => handleChange(i, 'url', e.target.value)}
                        error={input.url && !isValidUrl(input.url)}
                        helperText={input.url && !isValidUrl(input.url) ? 'Please enter a valid URL' : ''}
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
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        label="Validity (minutes)"
                        placeholder="60"
                        type="number"
                        value={input.validity}
                        onChange={(e) => handleChange(i, 'validity', e.target.value)}
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
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        label="Custom Shortcode"
                        placeholder="my-link"
                        value={input.shortcode}
                        onChange={(e) => handleChange(i, 'shortcode', e.target.value)}
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
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      {inputs.length > 1 && (
                        <Tooltip title="Remove URL">
                          <IconButton
                            onClick={() => handleRemoveInput(i)}
                            sx={{
                              color: '#dc3545',
                              '&:hover': {
                                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                                transform: 'scale(1.1)'
                              },
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <Trash2 size={18} />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Fade>
          ))}
        </Stack>

        {/* Action Buttons */}
        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            onClick={handleAddInput}
            disabled={inputs.length >= 5}
            startIcon={<Plus size={18} />}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1.5,
              fontWeight: 600,
              textTransform: 'none',
              borderColor: '#1976d2',
              color: '#1976d2',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            Add URL ({inputs.length}/5)
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading || !inputs.some(input => input.url && isValidUrl(input.url))}
            startIcon={loading ? null : <Zap size={18} />}
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              textTransform: 'none',
              backgroundColor: '#1976d2',
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
              '&:hover': {
                backgroundColor: '#1565c0',
                transform: 'translateY(-1px)',
                boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            {loading ? 'Shortening URLs...' : 'Shorten URLs'}
          </Button>
        </Box>

        {loading && (
          <Fade in={loading}>
            <Box sx={{ mt: 3 }}>
              <LinearProgress
                sx={{
                  borderRadius: 1,
                  height: 6,
                  backgroundColor: 'rgba(25, 118, 210, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#1976d2'
                  }
                }}
              />
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ textAlign: 'center', mt: 1 }}
              >
                Processing your URLs...
              </Typography>
            </Box>
          </Fade>
        )}
      </Paper>

      {/* Results Section */}
      {results.length > 0 && (
        <Fade in={true} timeout={500}>
          <Paper 
            elevation={0} 
            sx={{ 
              border: '1px solid #e0e0e0',
              borderRadius: 3,
              overflow: 'hidden',
              backgroundColor: '#fff'
            }}
          >
            <Box sx={{ 
              p: 3, 
              backgroundColor: '#f8f9fa',
              borderBottom: '1px solid #e0e0e0'
            }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  color: '#333',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Check size={20} color="#28a745" style={{ marginRight: 8 }} />
                Shortened URLs ({results.length} created)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Your short links are ready to use and share
              </Typography>
            </Box>
            
            <Box sx={{ p: 3 }}>
              <Stack spacing={2}>
                {results.map((result, idx) => (
                  <Card
                    key={idx}
                    elevation={0}
                    sx={{
                      border: '1px solid #e9ecef',
                      borderRadius: 2,
                      backgroundColor: '#f8fff9',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        borderColor: '#28a745',
                        backgroundColor: '#fff',
                        boxShadow: '0 4px 12px rgba(40, 167, 69, 0.1)',
                        transform: 'translateY(-1px)'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Link2 size={16} color="#28a745" />
                            <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
                              Short URL
                            </Typography>
                          </Box>
                          <Typography
                            variant="h6"
                            sx={{
                              color: '#28a745',
                              fontWeight: 600,
                              wordBreak: 'break-all',
                              fontFamily: 'monospace',
                              fontSize: '1rem'
                            }}
                          >
                            {result.shortLink}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ 
                              wordBreak: 'break-all',
                              mt: 0.5,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5
                            }}
                          >
                            <Globe size={14} />
                            {result.originalUrl}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Clock size={16} color="#ff9800" />
                            <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
                              Expires
                            </Typography>
                          </Box>
                          <Chip
                            label={result.expiry}
                            size="small"
                            sx={{
                              backgroundColor: '#fff3e0',
                              color: '#f57c00',
                              border: '1px solid #ffcc02',
                              fontWeight: 500
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Tooltip title={copiedIndex === idx ? 'Copied!' : 'Copy URL'}>
                              <IconButton
                                onClick={() => handleCopy(result.shortLink, idx)}
                                sx={{
                                  backgroundColor: copiedIndex === idx ? 'rgba(40, 167, 69, 0.1)' : 'rgba(25, 118, 210, 0.1)',
                                  color: copiedIndex === idx ? '#28a745' : '#1976d2',
                                  '&:hover': {
                                    backgroundColor: copiedIndex === idx ? 'rgba(40, 167, 69, 0.2)' : 'rgba(25, 118, 210, 0.2)',
                                    transform: 'scale(1.1)'
                                  },
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                {copiedIndex === idx ? <Check size={16} /> : <Copy size={16} />}
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Open URL">
                              <IconButton
                                onClick={() => window.open(result.shortLink, '_blank')}
                                sx={{
                                  backgroundColor: 'rgba(25, 118, 210, 0.1)',
                                  color: '#1976d2',
                                  '&:hover': {
                                    backgroundColor: 'rgba(25, 118, 210, 0.2)',
                                    transform: 'scale(1.1)'
                                  },
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                <ExternalLink size={16} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Box>
          </Paper>
        </Fade>
      )}

      {/* Info Alert */}
      <Fade in={true} timeout={1000}>
        <Alert 
          severity="info" 
          sx={{ 
            mt: 4,
            borderRadius: 2,
            backgroundColor: '#e3f2fd',
            border: '1px solid #bbdefb'
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            <strong>Pro tip:</strong> You can create up to 5 short URLs at once. Custom shortcodes are optional but make your links more memorable!
          </Typography>
        </Alert>
      </Fade>
    </Container>
  );
}

export default UrlShortenerForm;