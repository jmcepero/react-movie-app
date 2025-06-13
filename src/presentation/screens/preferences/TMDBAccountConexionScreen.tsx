import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Alert,
  // SafeAreaView, // Opcional, para mejor layout con Toolbar
} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Asumiendo que tienes un componente Toolbar similar a este:
// import { Toolbar } from '../../components/base/Toolbar'; // Ajusta la ruta a tu Toolbar

// --- INICIO: Componente Toolbar de ejemplo (si no tienes uno) ---
// Si ya tienes tu propio componente Toolbar, puedes omitir esta parte
// y asegurarte de importarlo correctamente.
interface ToolbarProps {
  title: string;
  showBackArrow?: boolean;
  onBackPress?: () => void;
}
const Toolbar: React.FC<ToolbarProps> = ({
  title,
  showBackArrow,
  onBackPress,
}) => (
  <View style={styles.toolbarContainer}>
    {showBackArrow && onBackPress && (
      <Button title="< Back" onPress={onBackPress} /> // Simplificado, usa un ícono en una app real
    )}
    <Text style={styles.toolbarTitle}>{title}</Text>
    {/* Espaciador para centrar el título si hay botón de retroceso */}
    {showBackArrow && <View style={{width: 50}} />}
  </View>
);
// --- FIN: Componente Toolbar de ejemplo ---

// Reemplaza esto con tu API Key real
const TMDB_API_KEY = '363b65a5ea601f4111fdddd19a87691a'; // ¡Usa tu API Key!
const TMDB_REQUEST_TOKEN_URL = `https://api.themoviedb.org/3/authentication/token/new?api_key=${TMDB_API_KEY}`;
const TMDB_AUTHENTICATE_URL_BASE = 'https://www.themoviedb.org/authenticate/';
const TMDB_SESSION_ID_URL = `https://api.themoviedb.org/3/authentication/session/new?api_key=${TMDB_API_KEY}`;
const TMDB_ACCOUNT_DETAILS_URL = `https://api.themoviedb.org/3/account?api_key=${TMDB_API_KEY}`;

const TMDB_SESSION_ID_KEY = '@tmdb_session_id';

const TMDBAccountConexionScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [requestToken, setRequestToken] = useState<string | null>(null);
  const [showWebView, setShowWebView] = useState(false);
  const [tmdbAuthUrl, setTmdbAuthUrl] = useState('');
  const [tmdbSessionId, setTmdbSessionId] = useState<string | null>(null);
  const [tmdbUsername, setTmdbUsername] = useState<string | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      const storedSessionId = await AsyncStorage.getItem(TMDB_SESSION_ID_KEY);
      if (storedSessionId) {
        setTmdbSessionId(storedSessionId);
        fetchAccountDetails(storedSessionId);
      }
    };
    loadSession();
  }, []);

  const fetchAccountDetails = async (sessionId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${TMDB_ACCOUNT_DETAILS_URL}&session_id=${sessionId}`,
      );
      const data = await response.json();
      if (data.success !== false && data.username) {
        setTmdbUsername(data.username);
        // No mostrar alerta aquí si es solo carga inicial, podría ser molesto
        // Alert.alert('Success', `Successfully connected as ${data.username}`);
      } else {
        await AsyncStorage.removeItem(TMDB_SESSION_ID_KEY);
        setTmdbSessionId(null);
        setTmdbUsername(null);
        console.warn(
          'Invalid session or failed to fetch account details:',
          data.status_message,
        );
      }
    } catch (error) {
      console.error('Error fetching account details:', error);
      // Alert.alert('Error', 'Could not fetch TMDB account details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectTmdb = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(TMDB_REQUEST_TOKEN_URL);
      const data = await response.json();
      if (data.success && data.request_token) {
        setRequestToken(data.request_token);
        setTmdbAuthUrl(`${TMDB_AUTHENTICATE_URL_BASE}${data.request_token}`);
        setShowWebView(true);
      } else {
        Alert.alert('Error', 'Could not get TMDB request token.');
        console.error('Failed to get request token:', data);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while connecting to TMDB.');
      console.error('Error creating request token:', error);
    }
    setIsLoading(false);
  };

  const createSessionId = async (approvedRequestToken: string) => {
    setIsLoading(true);
    setShowWebView(false);
    try {
      const response = await fetch(TMDB_SESSION_ID_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({request_token: approvedRequestToken}),
      });
      const data = await response.json();
      if (data.success && data.session_id) {
        setTmdbSessionId(data.session_id);
        await AsyncStorage.setItem(TMDB_SESSION_ID_KEY, data.session_id);
        await fetchAccountDetails(data.session_id); // Obtener nombre de usuario
        Alert.alert('Success!', 'Successfully connected to your TMDB account.');
      } else {
        Alert.alert('Error', 'Could not create TMDB session.');
        console.error('Failed to create session ID:', data);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while creating TMDB session.');
      console.error('Error creating session ID:', error);
    }
    setIsLoading(false);
  };

  const handleWebViewNavigationStateChange = (newNavState: any) => {
    const {url, loading} = newNavState;
    if (loading || !requestToken) return;

    // Lógica de detección de aprobación/denegación
    // Esta lógica es crucial y puede necesitar ajustes.
    // TMDB puede añadir `approved=true` o `denied=true` a la URL de autenticación
    // o redirigir a una URL que contenga el request_token.
    // Ejemplo: https://www.themoviedb.org/authenticate/REQUEST_TOKEN/allow
    //          https://www.themoviedb.org/authenticate/REQUEST_TOKEN/deny
    // O si usaste redirect_to: tuapp://auth?approved=true&request_token=REQUEST_TOKEN

    if (url.includes(requestToken) && url.endsWith('/allow')) {
      createSessionId(requestToken);
    } else if (url.includes(requestToken) && url.endsWith('/deny')) {
      setShowWebView(false);
      setRequestToken(null); // Limpiar el token si se deniega
      Alert.alert('Cancelled', 'TMDB connection was cancelled or denied.');
    }
  };

  const handleDisconnectTmdb = async () => {
    setIsLoading(true);
    await AsyncStorage.removeItem(TMDB_SESSION_ID_KEY);
    setTmdbSessionId(null);
    setTmdbUsername(null);
    setRequestToken(null);
    setShowWebView(false);
    setIsLoading(false);
    Alert.alert('Disconnected', 'Disconnected from TMDB account.');
  };

  const handleWebViewBackPress = () => {
    setShowWebView(false);
    // Opcional: resetear el requestToken si el usuario cancela a mitad del proceso
    // setRequestToken(null);
    Alert.alert('Cancelled', 'TMDB connection process was cancelled.');
  };

  if (isLoading && !showWebView) {
    // Mostrar loading principal solo si no está en webview
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (showWebView && tmdbAuthUrl) {
    return (
      // <SafeAreaView style={{ flex: 1 }}> // Opcional para iOS
      <View style={{flex: 1}}>
        <Toolbar
          title="Connect to TMDB"
          showBackArrow={true}
          onBackPress={handleWebViewBackPress}
        />
        <WebView
          source={{uri: tmdbAuthUrl}}
          onNavigationStateChange={handleWebViewNavigationStateChange}
          style={{flex: 1}}
          startInLoadingState={true} // Muestra un indicador de carga dentro de la WebView
          renderLoading={() => (
            // Personaliza el indicador de carga de la WebView
            <View style={styles.centeredAbsolute}>
              <ActivityIndicator size="large" color="#007AFF" />
            </View>
          )}
        />
      </View>
      // </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Toolbar title="TMDB Account" />
      <Text style={styles.title}>TMDB Account Connection</Text>
      {tmdbSessionId && tmdbUsername ? (
        <View style={styles.content}>
          <Text style={styles.statusText}>Connected as: {tmdbUsername}</Text>
          <Button
            title="Disconnect from TMDB"
            onPress={handleDisconnectTmdb}
            color="#FF3B30"
          />
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.statusText}>Not connected to TMDB.</Text>
          <Button title="Connect with TMDB" onPress={handleConnectTmdb} />
        </View>
      )}
    </View>
  );
};

export default TMDBAccountConexionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center', // El Toolbar se encargará del ancho completo
    // justifyContent: 'center',
  },
  content: {
    // Nuevo estilo para centrar el contenido principal
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredAbsolute: {
    // Para el loading de la WebView
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)', // Fondo semitransparente
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Centrar si el Toolbar no está
  },
  statusText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  // Estilos para el Toolbar de ejemplo
  toolbarContainer: {
    height: 56, // Altura estándar para toolbars
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Para el botón de retroceso y el título
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8', // Un color de fondo ligero
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#c7c7c7',
  },
  toolbarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // Para que el título ocupe el espacio restante y se centre
  },
});
