import React, { useState } from 'react'
import { checkSymptoms } from '../../services/api'
import {
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  IconButton,
  Alert,
  Snackbar,
} from '@mui/material'
import PageTemplate from '../../components/PageTemplate'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import SearchIcon from '@mui/icons-material/Search'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import CloseIcon from '@mui/icons-material/Close'

const commonSymptoms = [
  'Headache',
  'Fever',
  'Cough',
  'Fatigue',
  'Sore Throat',
  'Body Ache',
  'Nausea',
  'Dizziness',
]

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [customSymptom, setCustomSymptom] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  const handleAddSymptom = (symptom) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom])
    }
  }

  const handleRemoveSymptom = (symptomToRemove) => {
    setSelectedSymptoms(
      selectedSymptoms.filter((symptom) => symptom !== symptomToRemove)
    )
  }

  const handleAddCustomSymptom = () => {
    if (customSymptom && !selectedSymptoms.includes(customSymptom)) {
      setSelectedSymptoms([...selectedSymptoms, customSymptom])
      setCustomSymptom('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedSymptoms.length === 0) {
      setSnackbar({
        open: true,
        message: 'Please select at least one symptom',
        severity: 'warning',
      })
      return
    }

    setLoading(true)
    checkSymptoms({ symptoms: selectedSymptoms.join(', ') })
      .then((response) => {
        setResult(response.data.message)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setSnackbar({
          open: true,
          message: 'Failed to analyze symptoms',
          severity: 'error',
        })
        setLoading(false)
      })
  }

  return (
    <PageTemplate>
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          animation: 'fadeIn 1s ease-out',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #185a9d 0%, #43cea2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <LocalHospitalIcon sx={{ fontSize: 40 }} />
          Symptom Checker
        </Typography>

        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
            color: '#666',
            maxWidth: '800px',
            margin: '0 auto',
            mb: 6,
          }}
        >
          Check your symptoms and get quick medical guidance. Remember, this is
          not a substitute for professional medical advice.
        </Typography>

        <Grid container spacing={4}>
          {/* Symptom Selection */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(24,90,157,0.1)',
                height: '100%',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{ color: '#185a9d', fontWeight: 700, mb: 3 }}
                >
                  Common Symptoms
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    {commonSymptoms.map((symptom) => (
                      <Chip
                        key={symptom}
                        label={symptom}
                        onClick={() => handleAddSymptom(symptom)}
                        sx={{
                          background: selectedSymptoms.includes(symptom)
                            ? 'linear-gradient(135deg, #185a9d 0%, #43cea2 100%)'
                            : 'rgba(24,90,157,0.1)',
                          color: selectedSymptoms.includes(symptom)
                            ? '#fff'
                            : '#185a9d',
                          fontWeight: 500,
                          '&:hover': {
                            transform: 'translateY(-2px)',
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </Box>

                <Typography
                  variant="h6"
                  sx={{ color: '#185a9d', fontWeight: 600, mb: 2 }}
                >
                  Add Custom Symptom
                </Typography>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    value={customSymptom}
                    onChange={(e) => setCustomSymptom(e.target.value)}
                    placeholder="Enter symptom"
                    fullWidth
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#185a9d',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#43cea2',
                        },
                      },
                    }}
                  />
                  <Button
                    onClick={handleAddCustomSymptom}
                    disabled={!customSymptom}
                    variant="contained"
                    sx={{
                      background:
                        'linear-gradient(135deg, #185a9d 0%, #43cea2 100%)',
                      color: '#fff',
                      minWidth: '100px',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 20px rgba(24,90,157,0.3)',
                      },
                    }}
                  >
                    Add
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Selected Symptoms and Results */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(24,90,157,0.1)',
                height: '100%',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{ color: '#185a9d', fontWeight: 700, mb: 3 }}
                >
                  Selected Symptoms
                </Typography>

                <Box sx={{ mb: 4, minHeight: '100px' }}>
                  {selectedSymptoms.length === 0 ? (
                    <Typography
                      variant="body1"
                      sx={{ color: '#666', textAlign: 'center' }}
                    >
                      No symptoms selected yet
                    </Typography>
                  ) : (
                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                      {selectedSymptoms.map((symptom) => (
                        <Chip
                          key={symptom}
                          label={symptom}
                          onDelete={() => handleRemoveSymptom(symptom)}
                          sx={{
                            background:
                              'linear-gradient(135deg, #185a9d 0%, #43cea2 100%)',
                            color: '#fff',
                            fontWeight: 500,
                          }}
                        />
                      ))}
                    </Stack>
                  )}
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                  <Button
                    onClick={handleSubmit}
                    disabled={loading || selectedSymptoms.length === 0}
                    variant="contained"
                    startIcon={
                      loading ? <CircularProgress size={20} /> : <SearchIcon />
                    }
                    sx={{
                      background:
                        'linear-gradient(135deg, #185a9d 0%, #43cea2 100%)',
                      borderRadius: '30px',
                      padding: '12px 48px',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 8px 20px rgba(24,90,157,0.3)',
                      },
                    }}
                  >
                    {loading ? 'Analyzing...' : 'Check Symptoms'}
                  </Button>
                </Box>

                {result && (
                  <Box
                    sx={{
                      mt: 4,
                      p: 3,
                      borderRadius: '12px',
                      background: 'rgba(67,206,162,0.1)',
                      border: '1px solid #43cea2',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <HealthAndSafetyIcon sx={{ color: '#43cea2' }} />
                      <Typography
                        variant="h6"
                        sx={{ color: '#185a9d', fontWeight: 600 }}
                      >
                        Analysis Results
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{ color: '#666', lineHeight: 1.6 }}
                    >
                      {result}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageTemplate>
  )
}

export default SymptomChecker
