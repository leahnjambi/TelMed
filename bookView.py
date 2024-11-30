def book_appointment(request):
    if request.method == "POST":
        patient_name = request.POST.get('patient_name')
        doctor_id = request.POST.get('doctor')
        date = request.POST.get('date')
        time = request.POST.get('time')
        doctor = Doctor.objects.get(id=doctor_id)
        Appointment.objects.create(patient_name=patient_name, doctor=doctor, date=date, time=time)
        return redirect('home')
    doctors = Doctor.objects.all()
    return render(request, 'book_appointment.html', {'doctors': doctors})
