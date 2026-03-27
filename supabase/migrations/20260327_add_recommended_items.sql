-- recommendation_history에 실제 상품 데이터 저장 컬럼 추가
ALTER TABLE recommendation_history
  ADD COLUMN IF NOT EXISTS recommended_items jsonb DEFAULT '[]'::jsonb;
