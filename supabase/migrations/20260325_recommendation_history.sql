-- 추천 히스토리 테이블
CREATE TABLE IF NOT EXISTS recommendation_history (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  situation text,
  preferences text[],
  gender text,
  budget text,
  recommended_feed_ids text[] NOT NULL,
  reason text,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- RLS 활성화
ALTER TABLE recommendation_history ENABLE ROW LEVEL SECURITY;

-- 본인 데이터만 조회/삽입 가능
CREATE POLICY "users can read own history"
  ON recommendation_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "users can insert own history"
  ON recommendation_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);
