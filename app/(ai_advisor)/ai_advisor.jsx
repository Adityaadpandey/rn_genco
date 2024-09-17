import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useGoogleGenerativeAI } from '@google/generative-ai';
import { useTailwind } from 'nativewind';

export default function AIAdvisor() {
  const { tailwind } = useTailwind();
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateResponse = async () => {
    setLoading(true);
    const genAI = useGoogleGenerativeAI("AIzaSyCmZ6Wa57GndhZovM9KP2cuAvDDXakEo6Q");
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    try {
      const chatSession = model.startChat({
        generationConfig: {
          temperature: 1,
          topP: 0.95,
          topK: 64,
          maxOutputTokens: 8192,
          responseMimeType: 'text/plain',
        },
        history: [],
      });

      const result = await chatSession.sendMessage(input);
      setResponse(result.response.text());
    } catch (error) {
      console.error('Error generating response:', error);
      setResponse('An error occurred while generating the response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tailwind('flex-1 justify-center items-center p-4')}>
      <Text style={tailwind('text-2xl font-bold mb-4 text-blue-600')}>
        AI Advisor
      </Text>

      <ScrollView style={tailwind('w-full bg-gray-100 rounded-lg p-4')}>
        {loading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <Text style={tailwind('text-base text-gray-800')}>
            {response.split('\n').map((line, index) => (
              <Text key={index}>
                {line.startsWith('**') ? (
                  <Text style={tailwind('font-bold text-blue-800')}>
                    {line.replace(/\*\*/g, '')}
                  </Text>
                ) : line.startsWith('*') ? (
                  <Text style={tailwind('italic text-green-600')}>
                    {line.replace(/\*/g, '')}
                  </Text>
                ) : (
                  <Text>{line}</Text>
                )}
                {'\n'}
              </Text>
            ))}
          </Text>
        )}
      </ScrollView>

      <View style={tailwind('mt-4')}>
        <Text
          style={tailwind(
            'text-blue-500 underline cursor-pointer',
          )}
          onPress={handleGenerateResponse}
        >
          Generate Response
        </Text>
      </View>
    </View>
  );
}
