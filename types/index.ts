// Shared types for niwaki.cloud

export type NiwakiStyle = 'spherical' | 'tiered' | 'windswept' | 'naturalistic'
export type PruningFrequency = 'minimal' | 'monthly' | 'weekly' | 'expert'
export type MaturityYears = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export type Resolution = 'low' | 'medium' | 'high'
export type Difficulty = 'beginner' | 'intermediate' | 'expert'
export type UserRole = 'user' | 'moderator' | 'admin'
export type ContentStatus = 'pending' | 'approved' | 'rejected'
export type ContentType = 'garden' | 'photo' | 'comment'

export interface UserPreferences {
  years: MaturityYears
  pruningFrequency: PruningFrequency
  styles: NiwakiStyle[]
  resolution: Resolution
  climateZone?: string
}

export interface PlantAnalysis {
  id: string
  species: string
  location: string
  niwakiSuitability: number
  recommendedStyle: NiwakiStyle
}

export interface GardenAnalysis {
  plants: PlantAnalysis[]
  overallAssessment: string
}

export interface VisualizationJob {
  id: string
  imageId: string
  preferences: UserPreferences
  status: 'pending' | 'analysing' | 'generating' | 'completed' | 'failed'
  progress: number
  results?: VisualizationResult[]
  error?: string
  createdAt: Date
  updatedAt: Date
}

export interface VisualizationResult {
  id: string
  styleName: string
  style: NiwakiStyle
  imageUrl: string
  thumbnailUrl: string
}

export interface UploadResponse {
  success: boolean
  imageId: string
  thumbnailUrl: string
  dimensions: {
    width: number
    height: number
  }
}

export interface VisualizeRequest {
  imageId: string
  preferences: UserPreferences
}

export interface VisualizeResponse {
  success: boolean
  jobId: string
}

export interface JobStatusResponse {
  id: string
  status: VisualizationJob['status']
  progress: number
  results?: VisualizationResult[]
  error?: string
}

// Database types
export interface User {
  id: string
  email: string
  username: string | null
  display_name: string | null
  avatar_url: string | null
  bio: string | null
  role: UserRole
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Species {
  id: string
  slug: string
  common_name: string
  scientific_name: string
  difficulty: Difficulty
  description: string | null
  pruning_notes: string | null
  climate_zones: string[]
  image_url: string | null
  created_at: string
}

export interface GardenLocation {
  id: string
  user_id: string
  name: string
  description: string | null
  latitude: number
  longitude: number
  address: string | null
  city: string | null
  country: string | null
  species_ids: string[]
  is_featured: boolean
  is_public: boolean
  status: ContentStatus
  created_at: string
  updated_at: string
  user?: User
  photos?: Photo[]
}

export interface Photo {
  id: string
  user_id: string
  garden_location_id: string | null
  storage_path: string
  thumbnail_path: string | null
  title: string | null
  description: string | null
  is_primary: boolean
  vote_count: number
  wilson_score: number
  created_at: string
  user?: User
  garden_location?: GardenLocation
}

export interface Vote {
  id: string
  user_id: string
  photo_id: string
  value: -1 | 1
  created_at: string
}

export interface Comment {
  id: string
  user_id: string
  garden_location_id: string | null
  photo_id: string | null
  content: string
  is_visible: boolean
  created_at: string
  user?: User
}

export interface ModerationItem {
  id: string
  content_type: ContentType
  content_id: string
  reported_by: string | null
  reason: string | null
  status: ContentStatus
  moderator_id: string | null
  moderator_notes: string | null
  created_at: string
  resolved_at: string | null
}

export interface NearbyGarden {
  id: string
  name: string
  description: string | null
  distance_km: number
  latitude: number
  longitude: number
  photo_url: string | null
  vote_count: number
}

// Content types
export interface SpeciesContent {
  slug: string
  commonName: string
  scientificName: string
  japaneseName: string
  difficulty: Difficulty
  timeToMature: string
  climateZones: string[]
  description: string
  characteristics: string[]
  pruningCalendar: {
    spring: string
    summer: string
    autumn: string
    winter: string
  }
  techniques: string[]
  commonMistakes: string[]
  buyingTips: string
  relatedSpecies: string[]
}

export interface TechniqueContent {
  slug: string
  title: string
  japaneseTitle: string
  difficulty: Difficulty
  timeRequired: string
  introduction: string
  philosophy: string
  principles: {
    name: string
    meaning: string
    application: string
  }[]
  steps: {
    step: number
    title: string
    description: string
  }[]
  tools: {
    name: string
    use: string
  }[]
  commonMistakes: string[]
}

export interface GardenContent {
  slug: string
  name: string
  japaneseName: string
  location: {
    city: string
    region: string
    country: string
    coordinates: { lat: number; lng: number }
  }
  description: string
  highlights: string[]
  gardens: {
    name: string
    style: string
    description: string
  }[]
  practicalInfo: {
    hours: string
    admission: string
    address: string
    website: string
  }
  niwakiNotes: string
  visitingTips: string[]
}
