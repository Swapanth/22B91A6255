import React from 'react';
import { 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Box, 
  Chip, 
  Divider, 
  Card, 
  CardContent,
  Grid,
  Paper
} from '@mui/material';
import { 
  Link as LinkIcon, 
  MousePointer, 
  Calendar, 
  Clock, 
  MapPin, 
  Globe, 
  Activity 
} from 'lucide-react';

function UrlStatsTable({ stats }) {
  if (!stats) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const StatCard = ({ icon: Icon, label, value, color = 'primary' }) => (
    <Card 
      elevation={0} 
      sx={{ 
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Icon size={20} color={color === 'primary' ? '#1976d2' : '#666'} />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1, fontWeight: 500 }}>
            {label}
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ mt: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LinkIcon size={24} color="#1976d2" />
          <Typography 
            variant="h5" 
            sx={{ 
              ml: 1, 
              fontWeight: 700, 
              color: '#333',
              letterSpacing: '-0.02em'
            }}
          >
            URL Analytics
          </Typography>
        </Box>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#666', 
            backgroundColor: '#f8f9fa', 
            p: 2, 
            borderRadius: 2,
            fontFamily: 'monospace',
            wordBreak: 'break-all',
            border: '1px solid #e9ecef'
          }}
        >
          {stats.url}
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={MousePointer} 
            label="Total Clicks" 
            value={stats.totalClicks.toLocaleString()} 
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={Calendar} 
            label="Created" 
            value={formatDate(stats.createdAt)} 
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={Clock} 
            label="Expires" 
            value={formatDate(stats.expiry)} 
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={Activity} 
            label="Click Events" 
            value={stats.clickDetails.length} 
            color="success"
          />
        </Grid>
      </Grid>

      {/* Click Details Section */}
      {stats.clickDetails.length > 0 && (
        <Paper 
          elevation={0} 
          sx={{ 
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <Box sx={{ 
            p: 3, 
            backgroundColor: '#fafafa',
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
              <Activity size={20} style={{ marginRight: 8 }} />
              Click History ({stats.clickDetails.length} events)
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Detailed information about each click event
            </Typography>
          </Box>
          
          <List sx={{ p: 0 }}>
            {stats.clickDetails.map((click, i) => (
              <React.Fragment key={i}>
                <ListItem 
                  sx={{ 
                    py: 2.5, 
                    px: 3,
                    '&:hover': {
                      backgroundColor: '#f8f9fa'
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Clock size={16} color="#1976d2" />
                        <Typography 
                          variant="subtitle1" 
                          sx={{ 
                            ml: 1, 
                            fontWeight: 600,
                            color: '#333'
                          }}
                        >
                          {formatDate(click.timestamp)}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                        <Chip
                          icon={<Globe size={14} />}
                          label={`IP: ${click.ip}`}
                          size="small"
                          variant="outlined"
                          sx={{ 
                            backgroundColor: '#fff',
                            borderColor: '#e0e0e0',
                            '& .MuiChip-label': { fontSize: '0.75rem' }
                          }}
                        />
                        <Chip
                          icon={<Activity size={14} />}
                          label={`Source: ${click.source}`}
                          size="small"
                          variant="outlined"
                          sx={{ 
                            backgroundColor: '#fff',
                            borderColor: '#e0e0e0',
                            '& .MuiChip-label': { fontSize: '0.75rem' }
                          }}
                        />
                        <Chip
                          icon={<MapPin size={14} />}
                          label={`Location: ${click.location}`}
                          size="small"
                          variant="outlined"
                          sx={{ 
                            backgroundColor: '#fff',
                            borderColor: '#e0e0e0',
                            '& .MuiChip-label': { fontSize: '0.75rem' }
                          }}
                        />
                      </Box>
                    }
                  />
                </ListItem>
                {i < stats.clickDetails.length - 1 && (
                  <Divider sx={{ mx: 3, borderColor: '#f0f0f0' }} />
                )}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}

export default UrlStatsTable;