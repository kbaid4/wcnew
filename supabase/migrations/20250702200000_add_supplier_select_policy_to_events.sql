-- Allow suppliers to read events they are invited to or linked to
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Suppliers can view invited/public events" ON public.events
FOR SELECT TO authenticated
USING (
  visibility = 'public'
  OR EXISTS (
    SELECT 1 FROM public.invites i
    WHERE i.event_id = id
      AND i.supplier_email = auth.email()
  )
  OR EXISTS (
    SELECT 1 FROM public.event_suppliers es
    WHERE es.event_id = id
      AND es.supplier_user_id = auth.uid()
  )
); 