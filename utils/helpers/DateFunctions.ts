// Cache configuration
const CACHE_TTL = 60 * 60 * 1000; // 60 minutes in milliseconds
let cachedDate: { day: number; month: number; year: number } | null = null;
let lastFetchTimestamp: number = 0;

const fetchAPIDate = async (): Promise<{ day: number; month: number; year: number }> => {
  const now = Date.now();
  
  // Return cached data if it's still valid
  if (cachedDate && now - lastFetchTimestamp < CACHE_TTL) {
    console.log('Returning cached date');
    return cachedDate;
  }

  try {
    const response = await fetch('https://timeapi.io/api/time/current/zone?timeZone=Asia%2FBaku', {
      signal: AbortSignal.timeout(3000)
    });
    
    if (!response.ok) throw new Error('API response not OK');
    
    const data = await response.json();
    console.log('Time loaded from API');
    
    // Update cache
    cachedDate = {
      day: data.day,
      month: data.month,
      year: data.year
    };
    lastFetchTimestamp = Date.now();
    
    return cachedDate;
  } catch (error: any) {
    console.error('Failed to fetch API date:', error.message);
    
    // Return cache even if expired when API fails
    if (cachedDate) {
      console.warn('Using expired cached date');
      return cachedDate;
    }
    
    // Fallback to local date if no cache available
    const date = new Date();
    return {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear()
    };
  }
};

export const getFullDate = async (): Promise<string> => {
  const { day, month, year } = await fetchAPIDate();
  const formattedDay = `0${day}`.slice(-2);
  const formattedMonth = `0${month}`.slice(-2);
  return `${formattedDay}.${formattedMonth}.${year}`;
};

export const getMonthDate = async (): Promise<string> => {
  const { month, year } = await fetchAPIDate();
  const formattedMonth = `0${month}`.slice(-2);
  return `${formattedMonth}.${year}`;
};