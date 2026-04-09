import { REGIONS } from "../constants/regionData";

/**
 * 시도 + 시군구 2단계 지역 선택 컴포넌트
 *
 * Props
 * - cityCode        : 현재 선택된 시도 코드
 * - districtCode    : 현재 선택된 시군구 코드
 * - districtOptions : 선택된 시도에 속한 시군구 배열 [{ code, name }]
 * - onChange        : handleChange (name / value 형태 그대로 위임)
 * - disabled        : 로딩 중 비활성화 여부
 */
const RegionSelect = ({
    cityCode,
    districtCode,
    districtOptions,
    onChange,
    disabled,
}) => {
    return (
        <div className="signup-group">
        <label>지역</label>

        {/* 시도 선택 */}
        <select
            name="city_code"
            value={cityCode}
            onChange={onChange}
            disabled={disabled}
            style={{ marginBottom: "8px" }}
        >
            <option value="">시/도 선택</option>
            {REGIONS.map((region) => (
            <option key={region.code} value={region.code}>
                {region.name}
            </option>
            ))}
        </select>

        {/* 시군구 선택 — 시도 선택 후 표시 */}
        {cityCode && (
            <select
            name="district_code"
            value={districtCode}
            onChange={onChange}
            disabled={disabled || districtOptions.length === 0}
            >
            <option value="">구/군 선택</option>
            {districtOptions.map((district) => (
                <option key={district.code} value={district.code}>
                {district.name}
                </option>
            ))}
            </select>
        )}
        </div>
    );
};

export default RegionSelect;
