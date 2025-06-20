import React from 'react';

interface PasswordStrengthIndicatorProps {
  password?: string;
}

interface StrengthDetails {
  strengthLevel: 0 | 1 | 2 | 3 | 4;
  label: string;
  barColors: string[]; // Array of 4 Tailwind bg color classes for the bars
  textColorClass: string; // Tailwind text color class for the label
}

const calculatePasswordStrength = (password: string | undefined): StrengthDetails => {
  const baseBarColor = "bg-gray-200"; // Color for inactive/empty bars
  const defaultReturn: StrengthDetails = {
    strengthLevel: 0,
    label: "",
    barColors: [baseBarColor, baseBarColor, baseBarColor, baseBarColor],
    textColorClass: "text-gray-500",
  };

  if (!password || password.length === 0) {
    return defaultReturn;
  }

  let score = 0;
  const len = password.length;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password); // Matches any char not alphanumeric

  // Length points
  if (len >= 12) score += 4;
  else if (len >= 10) score += 3;
  else if (len >= 8) score += 2;
  else if (len >= 6) score += 1;
  // else score remains 0 for length

  // Character type points
  let types = 0;
  if (hasLower) types++;
  if (hasUpper) types++;
  if (hasNumber) types++;
  if (hasSymbol) types++;
  
  // Adjust score based on types and length interaction
  // A short password with many types is not as strong as a long one with fewer types
  if (types === 1 && len < 8) { // e.g. "aaaaa" or "12345"
      score = Math.min(score, 1); // Cap overall score if only one type and short
  } else if (types >= 3 && len >= 8) { // Good mix and good length
      score += types + 1; // Bonus for diversity at good length
  } else {
      score += types;
  }


  let currentStrengthLevel: 0 | 1 | 2 | 3 | 4 = 0;
  let currentLabel = "";
  let currentTextColorClass = "text-gray-500";
  const currentBarColors = [baseBarColor, baseBarColor, baseBarColor, baseBarColor];

  // Map score to levels (heuristic scores, adjust as needed)
  // Max score can be around 4 (length) + 4 (types) + 1 (bonus) = 9
  if (score <= 0 && len > 0) { // Ensure any non-empty password gets at least level 1 if it didn't score
      score = 1;
  }


  if (score <= 2 && score > 0) { // Includes passwords like "a", "12345", "abcdef"
    currentStrengthLevel = 1;
    currentLabel = "Very Weak";
    currentBarColors[0] = "bg-red-500";
    currentTextColorClass = "text-red-500";
  } else if (score <= 4) { // Includes "abcdefgh", "AaBbCc"
    currentStrengthLevel = 2;
    currentLabel = "Weak";
    currentBarColors[0] = "bg-red-500";
    currentBarColors[1] = "bg-orange-500";
    currentTextColorClass = "text-orange-500";
  } else if (score <= 6) { // Includes "Abcdefg1", "abcdefghijk"
    currentStrengthLevel = 3;
    currentLabel = "Medium";
    currentBarColors[0] = "bg-red-500";
    currentBarColors[1] = "bg-orange-500";
    currentBarColors[2] = "bg-yellow-500";
    currentTextColorClass = "text-yellow-500";
  } else if (score > 6) { // Includes "Abcdefg1!", "StrongPassword123!"
    currentStrengthLevel = 4;
    currentLabel = "Strong";
    currentBarColors[0] = "bg-red-500";
    currentBarColors[1] = "bg-orange-500";
    currentBarColors[2] = "bg-yellow-500";
    currentBarColors[3] = "bg-green-500";
    currentTextColorClass = "text-green-500";
  } else { // score is 0 and password is empty - handled by initial check
      return defaultReturn;
  }

  return {
    strengthLevel: currentStrengthLevel,
    label: currentLabel,
    barColors: currentBarColors,
    textColorClass: currentTextColorClass,
  };
};

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  console.log('PasswordStrengthIndicator loaded');
  const { label, barColors, textColorClass, strengthLevel } = calculatePasswordStrength(password);

  return (
    <div className="w-full mt-1">
      <div className="flex space-x-1 h-1.5 rounded-full overflow-hidden">
        {barColors.map((color, index) => (
          <div
            key={index}
            className={`flex-1 h-full ${color} transition-colors duration-300`}
            role="presentation"
            aria-label={`Strength bar segment ${index + 1} of 4`}
          />
        ))}
      </div>
      {strengthLevel > 0 && (
        <p className={`text-xs mt-1 ${textColorClass}`}>
          {label}
        </p>
      )}
      {strengthLevel === 0 && password && password.length > 0 && (
         // This case should ideally be covered by calculatePasswordStrength to yield level 1
         // Fallback for any edge case where a non-empty password results in level 0
        <p className="text-xs mt-1 text-red-500">
          Very Weak
        </p>
      )}
       {strengthLevel === 0 && (!password || password.length === 0) && (
        <p className="text-xs mt-1 text-gray-500 h-4"> {/* Keep height consistent */}
          {/* Placeholder text or empty */}
        </p>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;