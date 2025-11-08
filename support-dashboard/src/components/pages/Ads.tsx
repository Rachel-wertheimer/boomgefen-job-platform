import React, { useState, useEffect } from "react";
import Select from "react-select";
import type { StylesConfig } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchAds } from "../../app/slice/adsSlice";
import { AdsList } from "../AdsList";
import { useWindowSize } from "../../utils/hooks";
import { appColors } from "../../utils/colors";
import { SEO } from "../SEO";
import { seoKeywords } from "../../utils/seoKeywords";

const colors = appColors;

const customSelectStyles: StylesConfig<{ label: string; value: string }, false> = {
  control: (provided) => ({
    ...provided,
    borderRadius: "30px",
    borderColor: "#ced4da",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    padding: "6px 8px",
    cursor: "pointer",
    '&:hover': { borderColor: colors.primary },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? colors.primary : state.isFocused ? colors.activeBackground : 'white',
    color: state.isSelected ? 'white' : colors.textDark,
    cursor: 'pointer',
    borderRadius: '6px',
    margin: '2px 8px',
    width: 'auto',
    textAlign: 'right',
  }),
  placeholder: (provided) => ({ ...provided, color: "#868e96" }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    padding: "4px",
    textAlign: 'right',
  }),
  singleValue: (provided) => ({ ...provided, color: colors.textDark, fontWeight: 500 }),
};

export const Ads: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { ads, loading, error } = useSelector((state: RootState) => state.ads);
  const [selectedType, setSelectedType] = useState<{ label: string; value: string } | null>(null);

  const { width } = useWindowSize();
  const isMobile = width <= 600;

  const categories = [
    { value: "שחקנית", label: "שחקנית" },
    { value: "מפיקה", label: "מפיקה" },
  ];

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  const filterText = selectedType?.value?.toLowerCase() ?? "";
  const filteredAds = ads
    .filter((ad) => ad.type.toLowerCase().includes(filterText))
    .slice()
    .sort((a, b) => (b.id ?? 0) - (a.id ?? 0));

  const styles: Record<string, React.CSSProperties> = {
    container: { display: "flex", flexDirection: "column", alignItems: "center", width: "100%", minHeight: 300 },
    title: { fontSize: isMobile ? "2rem" : "2.5rem", marginBottom: "24px", color: colors.textDark, fontWeight: 700, textAlign: 'center' },
    filterBox: { width: "100%", maxWidth: "450px", margin: "0 auto 40px auto" },
    loadingText: { fontSize: '1.2rem', color: colors.primary, textAlign: 'center', padding: '40px', fontWeight: 600 },
    errorText: { fontSize: '1.2rem', color: colors.danger, textAlign: 'center', padding: '40px', fontWeight: 600 },
    noAdsText: { fontSize: '1.2rem', color: colors.textMedium, textAlign: 'center', padding: '40px', fontWeight: 500 }
  };

  return (
    <div style={styles.container}>
      <SEO
        title="לוח משרות לאמנים - BoomGefen | דרושים אמנים"
        description="עיון בלוח משרות מעודכן לאמנים. משרות בתחום האמנות, עבודות יצירה, והזדמנויות מקצועיות חדשות. BoomGefen - חיפוש עבודה לאמנים."
        keywords={seoKeywords}
      />
      <h2 style={styles.title}>לוח משרות</h2>

      <div style={styles.filterBox}>
        <Select
          options={categories}
          value={selectedType}
          onChange={(option) => setSelectedType(option)}
          onInputChange={(inputValue) => setSelectedType({ label: inputValue, value: inputValue })}
          placeholder="סינון לפי מקצוע..."
          isClearable
          isSearchable
          noOptionsMessage={() => "אין תוצאות — אפשר לכתוב סוג חדש"}
          styles={customSelectStyles}
        />
      </div>

      {loading ? (
        <p style={styles.loadingText}>טוען מודעות...</p>
      ) : error ? (
        <p style={styles.errorText}>שגיאה: {error}</p>
      ) : filteredAds.length > 0 ? (
        <AdsList ads={filteredAds} isMobile={isMobile} />
      ) : (
        <p style={styles.noAdsText}>
          {selectedType ? 'לא נמצאו מודעות העונות לחיפוש' : 'עדיין אין מודעות להצגה'}
        </p>
      )}
    </div>
  );
};
