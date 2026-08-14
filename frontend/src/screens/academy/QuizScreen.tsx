import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {
  ACADEMY_BACKGROUND,
  ACADEMY_PRIMARY,
  ACADEMY_TEXT_PRIMARY,
  ACADEMY_TEXT_SECONDARY,
  ACADEMY_SURFACE,
  ACADEMY_BORDER,
} from '../../lib/ui/Theme';

const QuizScreen = ({navigation}: any) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const question =
    'Which department is responsible for dispensing medications prescribed by doctors?';

  const options = [
    {id: 1, text: 'Radiology'},
    {id: 2, text: 'Emergency'},
    {id: 3, text: 'Pharmacy'},
    {id: 4, text: 'Laboratory'},
  ];

  const correctOption = 3;

  const handleSubmit = () => {
    if (selectedOption !== null && !submitted) {
      setSubmitted(true);
    } else if (submitted) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel="Close knowledge check"
          accessibilityHint="Returns to the previous screen">
          <MaterialCommunityIcons
            name="close"
            size={24}
            color={ACADEMY_TEXT_PRIMARY}
          />
        </TouchableOpacity>

        <Text
          style={styles.headerTitle}
          accessibilityRole="header">
          Knowledge Check
        </Text>

        <View style={{width: 40}} />
      </View>

      <View style={styles.container}>
        <View style={styles.questionContainer}>
          <Text
            style={styles.questionText}
            accessibilityRole="text"
            accessibilityLabel={`Question: ${question}`}>
            {question}
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {options.map(option => {
            const isSelected = selectedOption === option.id;
            const isCorrect = option.id === correctOption;

            let backgroundColor = ACADEMY_SURFACE;
            let borderColor = ACADEMY_BORDER;
            let textColor = ACADEMY_TEXT_PRIMARY;

            if (submitted) {
              if (isCorrect) {
                backgroundColor = '#D1FAE5';
                borderColor = ACADEMY_PRIMARY;
              } else if (isSelected && !isCorrect) {
                backgroundColor = '#FEE2E2';
                borderColor = '#EF4444';
              }
            } else if (isSelected) {
              backgroundColor = 'rgba(16, 185, 129, 0.1)';
              borderColor = ACADEMY_PRIMARY;
              textColor = ACADEMY_PRIMARY;
            }

            let accessibilityState: {
              selected?: boolean;
              disabled?: boolean;
            } = {
              selected: isSelected,
              disabled: submitted,
            };

            let accessibilityHint =
              'Selects this answer option';

            if (submitted && isCorrect) {
              accessibilityHint = 'This is the correct answer';
            } else if (submitted && isSelected && !isCorrect) {
              accessibilityHint = 'This answer is incorrect';
            }

            return (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionCard,
                  {backgroundColor, borderColor},
                ]}
                onPress={() =>
                  !submitted && setSelectedOption(option.id)
                }
                activeOpacity={submitted ? 1 : 0.7}
                disabled={submitted}
                accessibilityRole="radio"
                accessibilityLabel={`Option ${option.id}: ${option.text}`}
                accessibilityHint={accessibilityHint}
                accessibilityState={accessibilityState}>
                <Text
                  style={[
                    styles.optionText,
                    {color: textColor},
                  ]}>
                  {option.text}
                </Text>

                {submitted && isCorrect && (
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={24}
                    color={ACADEMY_PRIMARY}
                    accessible={false}
                  />
                )}

                {submitted && isSelected && !isCorrect && (
                  <MaterialCommunityIcons
                    name="close-circle"
                    size={24}
                    color="#EF4444"
                    accessible={false}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            selectedOption === null &&
              styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={selectedOption === null}
          accessibilityRole="button"
          accessibilityLabel={
            submitted ? 'Continue' : 'Check answer'
          }
          accessibilityHint={
            submitted
              ? 'Continue to the next screen'
              : 'Submit your selected answer'
          }
          accessibilityState={{
            disabled: selectedOption === null,
          }}>
          <Text style={styles.submitButtonText}>
            {submitted ? 'Continue' : 'Check Answer'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ACADEMY_BACKGROUND,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: ACADEMY_TEXT_PRIMARY,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  questionContainer: {
    marginBottom: 32,
  },
  questionText: {
    fontSize: 22,
    fontWeight: '700',
    color: ACADEMY_TEXT_PRIMARY,
    lineHeight: 32,
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  bottomBar: {
    padding: 24,
    backgroundColor: ACADEMY_BACKGROUND,
  },
  submitButton: {
    backgroundColor: ACADEMY_PRIMARY,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default QuizScreen;